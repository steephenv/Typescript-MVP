import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable-next-line
const saveRoleSchema = Joi.object().keys({
  userId: Joi.string().required(),
  isApproved: Joi.boolean().required(),
  interviewId: Joi.string().required(),
  comment: Joi.string().optional(),
  role: Joi.string()
    .valid('Consultant', 'Employee')
    .required(),
});

export const setRoleValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    saveRoleSchema,
    { stripUnknown: true },
    (err: any, value: any) => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      next();
    },
  );
};
