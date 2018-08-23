import { RequestHandler } from 'express';
import { Share } from '../../models/share';

import { messages } from '../../config/app/messages';
import * as shortId from 'shortid';
import { Promise as BluePromise } from 'bluebird';
import { User } from '../../models/User';

import { EmailTemplates, sendEmail } from '../../email/send-email';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const shareProject: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};
    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    req.body.createdAt = new Date();
    const sharedData = new Share(req.body);

    await sharedData.save();
    const mailOptions = {
      toAddresses: [req.body.sharedTo],
      template: EmailTemplates.SHARE_PROJECT,
      fromName: 'Miwago Team',
      subject: `Share Project Link`,
      fields: {
        url: req.body.sharedLink,
      },
    };

    await sendEmail(mailOptions);

    return res.status(201).send({
      success: true,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
