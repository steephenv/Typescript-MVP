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
        { $set: { booked: false, interviewId: null } },
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
      interviewStatus: 'Applied',
      createdAt: new Date(),
    });
    const savedInterview = await newInterview.save();

    availableSlot.booked = true;
    availableSlot.interviewId = savedInterview._id;
    await availableSlot.save();

    const userDetails = await User.findOne({ _id: contestant })
      .select('firstName lastName')
      .lean()
      .exec();

    const interviewTime = availableSlot.startTime.getTime();
    const mailOptions = {
      toAddresses: [req.body.email],
      template: EmailTemplates.INTERVIEW_SCHEDULED,
      fromName: 'Miwago Team',
      subject: `Interview Scheduled`,
      fields: {
        user: userDetails.firstName + ' ' + userDetails.lastName,
        date: availableSlot.startTime,
        calenderLink: `http://www.google.com/calendar/event?action=TEMPLATE&text=[Miwago Interview]
    &date=${interviewTime}&details=[Miwago Interview Added]&trp=false&sprop=&sprop=name:
    target="_blank" rel="nofollow"`,
      },
    };

    await sendEmail(mailOptions);

    return res.status(201).send({
      success: true,
      msg: messages.interviewScheduled.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
