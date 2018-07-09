import * as Joi from 'joi';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

// tslint:disable-next-line
const ResetPasswordSchema = Joi.object().keys({
  token: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const resetPasswordValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    ResetPasswordSchema,
    { stripUnknown: true },
    (err: any, value: any) => {
      // lme.e(err);
      if (err) {
        return next(
          new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err),
        );
      }
      req.body.createdAt = new Date();
      next();
    },
  );
};
