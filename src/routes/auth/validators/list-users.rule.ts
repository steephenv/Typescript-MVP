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
  if (req.query.role) {
    try {
      req.query.role = { $in: JSON.parse(req.query.role) };
    } catch (err) {
      return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err));
    }
  }
  if (req.query.userId) {
    try {
      req.query._id = { $in: JSON.parse(req.query.userId) };
    } catch (err) {
      return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err));
    }
  }
  next();
};
