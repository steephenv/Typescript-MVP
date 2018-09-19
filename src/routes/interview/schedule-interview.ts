import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import { InterviewDetails } from '../../models/InterviewDetails';
import { User } from '../../models/User';

const getCalenderLink = (start: Date, end: Date) => {
  // return 'ffff';

  const year = new Date(start).getFullYear().toString();

  let month = (new Date(start).getMonth() + 1).toString();
  month = ('0' + month).slice(-2);

  let day = new Date(start).getDay().toString();
  day = ('0' + day).slice(-2);

  let shrs = new Date(start).getHours().toString();
  shrs = ('0' + shrs).slice(-2);

  let smns = new Date(start).getMinutes().toString();
  smns = ('0' + smns).slice(-2);

  let ssecs = new Date(start).getSeconds().toString();
  ssecs = ('0' + ssecs).slice(-2);

  let ehrs = new Date(end).getHours().toString();
  ehrs = ('0' + ehrs).slice(-2);

  let emns = new Date(end).getMinutes().toString();
  emns = ('0' + emns).slice(-2);

  let esecs = new Date(end).getSeconds().toString();
  esecs = ('0' + esecs).slice(-2);

  const date1 = `${year}${month}${day}T${shrs}${smns}${ssecs}Z`;
  const date2 = `${year}${month}${day}T${ehrs}${emns}${esecs}Z`;

  const query = `${date1}%2F${date2}`;

  return `http://www.google.com/calendar/event?action=TEMPLATE&dates=${query}&text=MiwagoInterview`;
};

export const scheduleInterview: RequestHandler = async (req, res, next) => {
  const givenStartTime = new Date(req.body.startTime);
  const givenEndTime = new Date(req.body.endTime);
  const contestant = req.body.userId ? req.body.userId : res.locals.user.userId;

  try {
    const existingInterview: any = await InterviewDetails.findOne({
      contestantId: contestant,
      interviewStatus: 'Applied',
    }).exec();

    if (existingInterview) {
      const updateCalender = InterviewAvailabilityCalender.update(
        {
          interviewId: existingInterview._id,
        },
        { $set: { booked: false, interviewId: null, type: '' } },
      );

      existingInterview.interviewStatus = 'Cancelled';
      const updateExistingInterview = existingInterview.save();

      await BluePromise.all([updateCalender, updateExistingInterview]);
    }

    const availableSlot: any = await InterviewAvailabilityCalender.findOne({
      startTime: givenStartTime,
      endTime: givenEndTime,
      booked: false,
    }).exec();

    if (!availableSlot) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.NoInterviewer),
      );
    }

    const newInterview = new InterviewDetails({
      contestantId: contestant,
      startTime: availableSlot.startTime,
      endTime: availableSlot.endTime,
      typeOfCall: req.body.typeOfCall,
      platform: req.body.platform || '',
      platformId: req.body.platformId || '',
      interviewStatus: 'Applied',
      createdAt: new Date(),
    });
    const savedInterview = await newInterview.save();

    availableSlot.booked = true;
    availableSlot.type = 'interview';
    availableSlot.interviewId = savedInterview._id;
    await availableSlot.save();

    const userDetails = await User.findOne({ _id: contestant })
      .select('firstName lastName email profileDataVerified')
      .lean()
      .exec();

    // const interviewTime = availableSlot.startTime.getTime();

    const googleCalenderLink = getCalenderLink(
      availableSlot.startTime,
      availableSlot.endTime,
    );

    if (userDetails.profileDataVerified) {
      const mailOptions = {
        toAddresses: [userDetails.email],
        template: EmailTemplates.INTERVIEW_SCHEDULED,
        fromName: 'Capricorns Team',
        subject: `Interview Scheduled`,
        fields: {
          user: userDetails.firstName + ' ' + userDetails.lastName,
          date: availableSlot.startTime,
          calenderLink: googleCalenderLink,
        },
      };

      await sendEmail(mailOptions);
    }

    return res.status(201).send({
      success: true,
      msg: messages.interviewScheduled.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
