import * as Joi from 'joi';
import { RequestHandler } from 'express';

import { messages } from '../../../config/app/messages';

const isBusinessEmail = async (email: string) => {
  const { freeEmails } = await import('../../../config/app/free-emails');
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (freeEmails.domains.indexOf(domain) > -1) {
    return false;
  }
  return true;
};

// tslint:disable-next-line
const RegSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  isDirectRegistration: Joi.boolean().required(),
  secondaryEmail: Joi.string().optional(),
  appliedRole: Joi.string().when('isDirectRegistration', {
    is: false,
    then: Joi.required(),
  }),
  companyName: Joi.string().when('role', {
    is: 'Client',
    then: Joi.required(),
  }),
  role: Joi.string().when('isDirectRegistration', {
    is: true,
    then: Joi.required(),
  }),
  url: Joi.string().required(),
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
      if (req.body.appliedRole === 'Client') {
        const bEmail = await isBusinessEmail(req.body.email);
        if (!bEmail) {
          return res.status(422).send({
            success: false,
            msg: messages.NotBsnsEmail.ENG,
          });
        }
      }
      req.body.createdAt = new Date();
      next();
    },
  );
};
