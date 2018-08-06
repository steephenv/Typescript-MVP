import * as shortId from 'shortid';
import { Promise as BluePromise } from 'bluebird';
import { RequestHandler } from 'express';
import * as sgMail from '@sendgrid/mail';

import { TempUser } from '../../models/TempUser';
import { User } from '../../models/User';

import { messages } from '../../config/app/messages';
import { secrets } from '../../config/credentials/secrets';
import { sendGTemplates } from '../../config/credentials/sendgrid-templates';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

sgMail.setApiKey(secrets.sendGridKey);

export const commonRegistration: RequestHandler = async (req, res, next) => {
  try {
    const [user, temp] = await BluePromise.all([
      User.findOne({ email: req.body.email }).exec(),
      TempUser.findOne({ email: req.body.email }).exec(),
    ]);
    if (user || temp) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.emailExisting.ENG),
      );
    }
    const token = shortId.generate();

    req.body.role = 'User';
    if (req.body.appliedRole === 'Client') {
      req.body.role = 'Client';
    }
    req.body.token = token;
    const verificationUrl = req.body.url.replace(/{token}/g, token);
    const tempUser: any = new TempUser(req.body);
    await tempUser.save();
    const msg: any = {
      to: req.body.email,
      from: 'miwago@cubettech.com',
      subject: 'Email Verification',
      text: 'To verify your email id is valid or not',
      html: '<p></p>',
      templateId: sendGTemplates.confirmRegistration,
      substitutionWrappers: ['%', '%'],
      substitutions: {
        user: tempUser.firstName + ' ' + tempUser.lastName,
        URL: verificationUrl,
      },
    };

    await sgMail.send(msg);

    return res.status(201).send({
      success: true,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};

export const directRegistration: RequestHandler = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.emailExisting.ENG),
      );
    }
    req.body.isDirectRegistration = true;
    req.body.createdBy = res.locals.user.userId;
    req.body.appliedRole = req.body.role;
    const newUser: any = new User(req.body);
    await newUser.save();
    return res.status(201).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};

export const register: RequestHandler = async (req, res, next) => {
  if (req.body.isDirectRegistration) {
    return directRegistration(req, res, next);
  }
  return commonRegistration(req, res, next);
};
