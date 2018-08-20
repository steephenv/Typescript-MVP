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
    if (req.body.isApproved) {
      const userUpdate = User.update(
        { _id: req.body.userId },
        {
          $set: {
            role: req.body.role,
            appliedRole: '',
            interviewStatus: 'Passed',
          },
        },
      );

      const interviewUpdate = InterviewDetails.update(
        {
          _id: req.body.interviewId,
        },
        { $set: { interviewStatus: 'Passed', comment: userComment } },
      );
      await BluePromise.all([userUpdate, interviewUpdate]);
    } else {
      const userUpdate = User.update(
        { _id: req.body.userId },
        {
          $set: {
            interviewStatus: 'Failed',
          },
        },
      );
      const interviewUpdate = InterviewDetails.update(
        {
          _id: req.body.interviewId,
        },
        { $set: { interviewStatus: 'Failed', comment: userComment } },
      );

      await BluePromise.all([userUpdate, interviewUpdate]);
    }

    if (req.body.isApproved) {
      const user = await User.findOne({ _id: req.body.userId })
        .lean()
        .exec();

      const mailOptions = {
        toAddresses: [user.email],
        template: EmailTemplates.ROLE_ACCEPT,
        fromName: 'Miwago Team',
        subject: `Role Accept`,
        fields: {
          user: user.firstName + ' ' + user.lastName,
          role: req.body.role,
        },
      };
      await sendEmail(mailOptions);
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
