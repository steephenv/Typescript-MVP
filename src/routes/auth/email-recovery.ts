import { RequestHandler } from 'express';
import * as sgMail from '@sendgrid/mail';

import { PersonalDetails } from '../../models/PersonalDetails';

import { messages } from '../../config/app/messages';
import { secrets } from '../../config/credentials/secrets';
import { sendGTemplates } from '../../config/credentials/sendgrid-templates';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

sgMail.setApiKey(secrets.sendGridKey);

export const emailRecoveryFunction: RequestHandler = async (req, res, next) => {
  try {
    const user = await PersonalDetails.findOne({
      secondaryEmail: req.body.secEmail,
    })
      .lean()
      .exec();
    if (!user) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.noUser.ENG),
      );
    }
    const msg: any = {
      to: req.body.secEmail,
      from: 'miwago@cubettech.com',
      subject: 'Email Recovery',
      text: 'To recover the primary email',
      html: '<p></p>',
      templateId: sendGTemplates.emailRecovery,
      substitutionWrappers: ['%', '%'],
      substitutions: {
        email: user.email,
      },
    };
    await sgMail.send(msg);
    return res.status(202).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
