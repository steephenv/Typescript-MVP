import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

export const listUsersValidation: RequestHandler = (req, res, next) => {
  if (!req.query || !req.query.field || !req.query.values.length) {
    return next(
      new RequestError(
        RequestErrorType.UNPROCESSABLE_ENTITY,
        'No Given Conditions',
      ),
    );
  }
  try {
    const queryValues = JSON.parse(req.query.values);
    if (!queryValues.length) {
      return next(
        new RequestError(
          RequestErrorType.UNPROCESSABLE_ENTITY,
          'No Given Conditions',
        ),
      );
    }
    res.locals.query = { values: queryValues, field: req.query.field };
    next();
  } catch (err) {
    return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err));
  }
};
