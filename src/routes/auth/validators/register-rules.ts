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
  secondaryEmail: Joi.string().optional(),
  mobile: Joi.string().required(),
  appliedRole: Joi.string().required(),
  companyName: Joi.string().optional(),
  role: Joi.string().optional(),
  url: Joi.string().required(),
});

export const registerValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    RegSchema,
    { stripUnknown: true },
    (err: any, value: any) => {
      // lme.e(err);
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      if (req.body.appliedRole === 'Client' && !req.body.companyName) {
        return res.status(422).send({
          success: false,
          msg: messages.invalidParams.ENG,
        });
        return;
      }
      if (req.body.appliedRole === 'Client') {
        if (!isBusinessEmail(req.body.email)) {
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
