import { RequestHandler } from 'express';
import { Share } from '../../models/share';
import * as sgMail from '@sendgrid/mail';

import { messages } from '../../config/app/messages';
import { secrets } from '../../config/credentials/secrets';

sgMail.setApiKey(secrets.sendGridKey);
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
    const msg: any = {
      to: req.body.sharedTo,
      from: 'miwago@cubettech.com',
      subject: 'Project Link',
      text: 'Link to shared project',
      html: '<p></p>',
      // templateId: sendGTemplates.confirmRegistration,
      substitutionWrappers: ['%', '%'],
      substitutions: {
        URL: req.body.sharedLink,
      },
    };

    await sgMail.send(msg);

    return res.status(201).send({
      success: true,
      msg: messages.emailSent.ENG,
    });
    // return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
