import * as shortId from 'shortid';
import { RequestHandler } from 'express';
import * as sgMail from '@sendgrid/mail';

import { User } from '../../models/User';
import { ResetPassword } from '../../models/ResetPassword';

import { messages } from '../../config/app/messages';
import { secrets } from '../../config/credentials/secrets';
import { sendGTemplates } from '../../config/credentials/sendgrid-templates';

sgMail.setApiKey(secrets.sendGridKey);

export const forgotPassword: RequestHandler = async (req, res) => {
  try {
    let verificationUrl: string;
    const user = await User.findOne({ email: res.locals.data.email })
      .lean()
      .exec();
    if (!user) {
      return res.status(400).send({
        success: false,
        msg: 'No such User present',
      });
    }
    const token = shortId.generate();
    verificationUrl = res.locals.data.url.replace(/{token}/g, token);
    const forgot = new ResetPassword({
      email: res.locals.data.email,
      token: token,
      createdAt: new Date(),
    });
    const forgotData = await forgot.save();
    const msg: any = {
      to: res.locals.data.email,
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
    await new Promise(resolve => {
      sgMail.send(msg, (err: any, json: any) => {
        return resolve();
      });
    });
    return res.status(202).send({
      success: true,
      url: verificationUrl,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    lme.e(err);
    return res.status(500).send({
      success: false,
      msg: err,
    });
  }
};
