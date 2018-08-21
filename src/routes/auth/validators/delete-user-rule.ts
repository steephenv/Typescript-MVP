import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

export const deleteUsersValidation: RequestHandler = (req, res, next) => {
  if (req.query.key && req.query.value) {
    try {
      req.query.condition = {};
      req.query.condition[req.query.key] = req.query.value;
    } catch (err) {
      return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err));
    }
  } else {
    return next(new RequestError(RequestErrorType.BAD_REQUEST));
  }
  next();
};
