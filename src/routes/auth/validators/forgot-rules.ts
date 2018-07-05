import * as Joi from 'joi';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

// tslint:disable-next-line
const ForgotPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  url: Joi.string().required(),
});

export const forgotPasswordRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    ForgotPasswordSchema,
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
