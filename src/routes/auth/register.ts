import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

// ctrl
import { registerCtrl } from './controllers/register.ctrl';

export const register: RequestHandler = async (req, res, next) => {
  try {
    await registerCtrl({
      fistName: req.body.fistName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      mobile: req.body.mobile,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
