import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

export const listUsersValidation: RequestHandler = (req, res, next) => {
  if (req.query.appliedRole) {
    try {
      req.query.appliedRole = { $in: JSON.parse(req.query.appliedRole) };
    } catch (err) {
      return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err));
    }
  }
  next();
};
