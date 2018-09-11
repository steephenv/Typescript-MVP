import { RequestHandler } from 'express';
import { EmailTemplates, sendEmail } from '../../email/send-email';
import { InterviewDetails } from '../../models/InterviewDetails';
import { User } from '../../models/User';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveReviewStatus: RequestHandler = async (req, res, next) => {
  try {
    await User.update(
      { _id: res.locals.user.userId },
      { $set: { profileDataVerified: true } },
    );
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
    const userDetails = await User.findOne({ _id: res.locals.user.userId })
      .select('firstName lastName email isLinkedinProfileFetched')
      .lean()
      .exec();

    const existingInterview: any = await InterviewDetails.findOne({
      contestantId: res.locals.user.userId,
      interviewStatus: 'Applied',
    }).exec();
    if (!existingInterview) {
      return res.status(200).send({
        success: true,
        msg: 'profileDataVerified field updated',
      });
    }
    const googleCalenderLink = getCalenderLink(
      existingInterview.startTime,
      existingInterview.endTime,
    );

    const mailOptions = {
      toAddresses: [userDetails.email],
      template: EmailTemplates.INTERVIEW_SCHEDULED,
      fromName: 'Miwago Team',
      subject: `Interview Scheduled`,
      fields: {
        user: userDetails.firstName + ' ' + userDetails.lastName,
        date: existingInterview.startTime,
        calenderLink: googleCalenderLink,
      },
    };

    await sendEmail(mailOptions);

    return res.status(200).send({
      success: true,
      msg: 'interview email successfully send',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
