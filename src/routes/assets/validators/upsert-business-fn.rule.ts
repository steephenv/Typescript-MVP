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
      __v: Joi.optional(),
      name: Joi.string().required(),
      subFunctions: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            businessFunctionId: Joi.string().optional(),
            _id: Joi.string().optional(),
            __v: Joi.optional(),
          }),
        )
        .optional(),
    }),
  ),
});

export const upsertBusinessFnRule: RequestHandler = (req, res, next) => {
  const { error } = Joi.validate(req.body, contentSchema);
  if (error) {
    return next(new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, error));
  }
  next();
};
