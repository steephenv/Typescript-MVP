import * as Joi from 'joi';
import { RequestHandler } from 'express';

// import { messages } from '../../../config/app/messages';

// tslint:disable-next-line
const RegSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
});

export const registerValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    RegSchema,
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
