import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable-next-line
const deleteApplicantSchema = Joi.object().keys({
  userId: Joi.string().required(),
});

export const deleteApplicantRule: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.query,
    deleteApplicantSchema,
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
