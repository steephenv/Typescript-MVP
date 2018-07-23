import * as Joi from 'joi';
import { RequestHandler } from 'express';

const scheduleInterviewSchema = Joi.object().keys({
  dateString: Joi.string().required(),
  typeOfCall: Joi.strict().required(),
  id: Joi.string()
    .length(24)
    .optional(),
  slot: Joi.string()
    .length(24)
    .required(),
});

export const scheduleInterviewRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    scheduleInterviewSchema,
    { stripUnknown: true },
    (err: any) => {
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
