import * as shortId from 'shortid';
import { Promise as BluePromise } from 'bluebird';
import { RequestHandler } from 'express';

import { TempUser } from '../../models/TempUser';
import { User } from '../../models/User';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

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
    if (
      req.body.appliedRole === 'Consultant' ||
      req.body.appliedRole === 'Employee'
    ) {
      req.body.countableReferer = false;
    }
    const verificationUrl = req.body.url.replace(/{token}/g, token);
    const tempUser: any = new TempUser(req.body);
    await tempUser.save();

    const mailOptions = {
      toAddresses: [req.body.email],
      template: EmailTemplates.CONFIRM_REGISTRATION,
      fromName: 'Capricorns Team',
      subject: `Confirm Registration`,
      fields: {
        user: tempUser.firstName + ' ' + tempUser.lastName,
        url: verificationUrl,
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

    const mailOptions = {
      toAddresses: [req.body.email],
      template: EmailTemplates.CLIENT_REG_EMAIL,
      fromName: 'Capricorns Team',
      subject: `Registered Successfully`,
      fields: {
        user: req.body.firstName + ' ' + req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        url: req.body.url,
      },
    };

    await sendEmail(mailOptions);
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
