import * as shortId from 'shortid';
import { RequestHandler } from 'express';

import { User } from '../../models/User';
import { ResetPassword } from '../../models/ResetPassword';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    let verificationUrl: string;
    const user = await User.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (!user) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.noUser.ENG),
      );
    }
    const genToken = shortId.generate();
    verificationUrl = req.body.url.replace(/{token}/g, genToken);
    const forgot = new ResetPassword({
      email: req.body.email,
      token: genToken,
      createdAt: new Date(),
    });
    await forgot.save();

    const mailOptions = {
      toAddresses: [req.body.email],
      template: EmailTemplates.FORGOT_PASSWORD,
      fromName: 'Capricorns Team',
      subject: `Forgot Password`,
      fields: {
        url: verificationUrl,
      },
    };

    await sendEmail(mailOptions);

    return res.status(202).send({
      success: true,
      url: verificationUrl,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
