import { RequestHandler } from 'express';

import { User } from '../../models/User';

import { messages } from '../../config/app/messages';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const registration: RequestHandler = async (req, res, next) => {
  try {
    const tempUser: any = new User(req.body);
    await tempUser.save();

    return res.status(201).send({
      success: true,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
