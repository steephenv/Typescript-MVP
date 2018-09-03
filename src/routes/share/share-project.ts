import { RequestHandler } from 'express';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const shareProject: RequestHandler = async (req, res, next) => {
  try {
    const mailOptions = {
      toAddresses: [req.body.sharedTo],
      template: EmailTemplates.SHARE_PROJECT,
      fromName: 'Miwago Team',
      subject: `Share Project Link`,
      fields: {
        datas: req.body.datas,
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
