import { RequestHandler } from 'express';
import * as Joi from 'joi';

import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

const contentSchema = Joi.object().keys({
  content: Joi.array().items(
    Joi.object().keys({
      _id: Joi.string().optional(),
      name: Joi.string().required(),
      businessFunctionId: Joi.string().required(),
    }),
  ),
});

export const upsertBusinessSubFnRule: RequestHandler = (req, res, next) => {
  const { error } = Joi.validate(req.body, contentSchema);
  if (error) {
    return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, error));
  }
  next();
};
