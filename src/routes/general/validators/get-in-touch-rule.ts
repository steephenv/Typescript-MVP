import * as Joi from 'joi';
import { RequestHandler } from 'express';

// import { messages } from '../../../config/app/messages';

// tslint:disable-next-line
const getInTouchSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  mobile: Joi.number().required(),
  message: Joi.string()
    .optional()
    .allow(''),
});

export const getInTouchValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    getInTouchSchema,
    { stripUnknown: true },
    async (err: any, value: any) => {
      // lme.e(err);
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      req.body.createdAt = new Date();
      next();
    },
  );
};
