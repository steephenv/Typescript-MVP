import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { EmailTemplates, sendEmail } from '../../email/send-email';

export const giveAway: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.emails) {
      const userId = res.locals.user.userId;
      const link = `https://dev-miwago.cubettech.in/#/home;referalId=${userId}`;
      //   req.body.emails.forEach(async (email: any) => {
      const mailOptions = {
        toAddresses: req.body.emails,
        template: EmailTemplates.GIVEAWAY_EMAIL,
        fromName: 'Capricorns Team',
        subject: `Referrer Link`,
        fields: {
          url: link,
        },
      };
      await sendEmail(mailOptions);
      //   });
    }

    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
