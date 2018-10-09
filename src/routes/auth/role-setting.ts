import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { EmailTemplates, sendEmail } from '../../email/send-email';

import { User } from '../../models/User';
import { InterviewDetails } from '../../models/InterviewDetails';

export const saveRole: RequestHandler = async (req, res, next) => {
  try {
    const userComment = req.body.comment ? req.body.comment : '';
    const userReason = req.body.reason ? req.body.reason : '';
    if (req.body.isApproved) {
      const userUpdate = User.update(
        { _id: req.body.userId },
        {
          $set: {
            role: req.body.role,
            appliedRole: '',
            interviewStatus: 'Passed',
            userRating: req.body.userRating,
          },
        },
      ).exec();

      const interviewUpdate = InterviewDetails.update(
        {
          _id: req.body.interviewId,
        },
        { $set: { interviewStatus: 'Passed' } },
        { $push: { comment: userComment } },
      ).exec();

      await BluePromise.all([userUpdate, interviewUpdate]);

      const user = await User.findOne({ _id: req.body.userId })
        .lean()
        .exec();

      const mailOptions = {
        toAddresses: [user.email],
        template: EmailTemplates.ROLE_ACCEPT,
        fromName: 'Capricorns Team',
        subject: `Role Accept`,
        fields: {
          user: user.firstName + ' ' + user.lastName,
          role: req.body.role,
          loginUrl: req.body.loginUrl,
          homeUrl: req.body.homeUrl,
        },
      };
      await sendEmail(mailOptions);
    } else {
      const userUpdate = User.update(
        { _id: req.body.userId },
        {
          $set: {
            interviewStatus: 'Failed',
            appliedRole: 'User',
            role: 'User',
          },
        },
      ).exec();
      const interviewUpdate = InterviewDetails.update(
        {
          _id: req.body.interviewId,
        },
        {
          $set: {
            interviewStatus: 'Failed',
            comment: userComment,
            reason: userReason,
          },
        },
        { $push: { comment: userComment } },
      ).exec();

      await BluePromise.all([userUpdate, interviewUpdate]);

      const user = await User.findOne({ _id: req.body.userId })
        .lean()
        .exec();

      const mailOptions = {
        toAddresses: [user.email],
        template: EmailTemplates.ROLE_REJECT,
        fromName: 'Capricorns Team',
        subject: `Role Rejected`,
        fields: {
          user: user.firstName + ' ' + user.lastName,
          role: req.body.role,
          // comment: req.body.comment,
          loginUrl: req.body.loginUrl,
          homeUrl: req.body.homeUrl,
        },
      };
      await sendEmail(mailOptions);
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
