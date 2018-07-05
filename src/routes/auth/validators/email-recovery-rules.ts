import * as Joi from 'joi';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

// tslint:disable-next-line
const RecoveryEmailSchema = Joi.object().keys({
  secEmail: Joi.string()
    .email()
    .required(),
});

export const recoveryEmailRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    RecoveryEmailSchema,
    { stripUnknown: true },
    (err: any) => {
      if (err) {
        return next(
          new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err),
        );
      }
      next();
    },
  );
};
