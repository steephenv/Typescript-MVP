import { ProjectRequest } from '../../models/ProjectRequest';
import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

// import { getMatchingResult } from '../../utils/matching-system/index';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import { User } from '../../models/User';

export const saveProjectRequest: RequestHandler = async (req, res, next) => {
  try {
    const consNo = await User.count({ role: 'Consultant' }).exec();
    req.body.bestFitNo = consNo;
    req.body.userId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    req.body.updatedAt = new Date();

    const requestDetails: any = await ProjectRequest.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true },
    ).exec();

    if (requestDetails) {
      if (requestDetails.status === 'Request') {
        // const userIds = await getMatchingResult(
        //   { startTime: new Date(), endTime: new Date() },
        //   3,
        // );

        // if (!userIds.length) {
        //   return;
        // }

        const cIds = await User.find({ role: 'Consultant' })
          .distinct('_id')
          .exec();

        const userMailIds = await User.find({ role: 'Consultant' })
          .distinct('email')
          .exec();

        const requestUpdate = ProjectRequest.findOneAndUpdate(
          { _id: req.body._id },
          { $set: { consultantIds: cIds } },
          { new: true },
        ).exec();

        const mailOptions: any = {
          toAddresses: userMailIds,
          template: EmailTemplates.PROJECT_REQUEST_EMAIL,
          fromName: 'Miwago Team',
          subject: `New Project Request`,
        };

        const mailSend = sendEmail(mailOptions);

        await BluePromise.all([requestUpdate, mailSend]);
      }
    }
    return res.status(200).send({ success: true, bestFitNo: consNo });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
