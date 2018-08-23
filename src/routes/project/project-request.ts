import { ProjectRequest } from '../../models/ProjectRequest';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

// import { getMatchingResult } from '../../utils/matching-system/index';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import { User } from '../../models/User';

export const saveProjectRequest: RequestHandler = async (req, res, next) => {
  try {
    req.body.userId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    req.body.updatedAt = new Date();

    const requestDetails: any = await ProjectRequest.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true },
    ).exec();

    if (!requestDetails) {
      return;
    }

    if (requestDetails.status === 'Request') {
      // const userIds = await getMatchingResult(
      //   { startTime: new Date(), endTime: new Date() },
      //   3,
      // );

      // if (!userIds.length) {
      //   return;
      // }

      const userMailIds = await User.find({ role: 'Consultant' })
        .distinct('email')
        .exec();

      const mailOptions: any = {
        toAddresses: userMailIds,
        template: EmailTemplates.PROJECT_REQUEST_EMAIL,
        fromName: 'Miwago Team',
        subject: `New Project Request`,
      };

      await sendEmail(mailOptions);
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
