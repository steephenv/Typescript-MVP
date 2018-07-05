import * as shortId from 'shortid';
import { RequestHandler } from 'express';
import * as sgMail from '@sendgrid/mail';

import { User } from '../../models/User';
import { ResetPassword } from '../../models/ResetPassword';

import { messages } from '../../config/app/messages';
import { secrets } from '../../config/credentials/secrets';
import { sendGTemplates } from '../../config/credentials/sendgrid-templates';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

sgMail.setApiKey(secrets.sendGridKey);

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
    const msg: any = {
      to: req.body.email,
      from: 'miwago@cubettech.com',
      subject: 'Reset Password',
      text: 'To reset your account password, ',
      html: '<p></p>',
      substitutionWrappers: ['%', '%'],
      templateId: sendGTemplates.resetPassword,
      substitutions: {
        url: verificationUrl,
        user: user.firstName + ' ' + user.lastName,
      },
    };
    await sgMail.send(msg);
    return res.status(202).send({
      success: true,
      url: verificationUrl,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
