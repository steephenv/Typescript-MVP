import * as shortId from 'shortid';
import { Promise as BluePromise } from 'bluebird';
import { RequestHandler } from 'express';

import { TempUser } from '../../models/TempUser';
import { User } from '../../models/User';

import { messages } from '../../config/app/messages';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const directRegistration: RequestHandler = async (req, res, next) => {
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

    // const verificationUrl = req.body.url.replace(/{token}/g, token);
    const newUser: any = new User(req.body);
    await newUser.save();

    return res.status(201).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
