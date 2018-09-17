import { RequestHandler } from 'express';

import { PersonalDetails } from '../../models/PersonalDetails';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

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

    const mailOptions = {
      toAddresses: [req.body.secEmail],
      template: EmailTemplates.EMAIL_RECOVERY,
      fromName: 'Capricorns Team',
      subject: `Email Recovery`,
      fields: {
        user: user.firstName + ' ' + user.lastName,
        email: user.primaryEmail,
      },
    };

    await sendEmail(mailOptions);

    return res.status(202).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
