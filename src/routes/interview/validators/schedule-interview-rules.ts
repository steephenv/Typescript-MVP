import * as Joi from 'joi';
import { RequestHandler } from 'express';

const scheduleInterviewSchema = Joi.object().keys({
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  typeOfCall: Joi.string()
    .required()
    .valid('Video', 'Audio'),
  platform: Joi.string().when('typeOfCall', {
    is: 'Video',
    then: Joi.required(),
  }),
  platformId: Joi.string().when('typeOfCall', {
    is: 'Video',
    then: Joi.required(),
  }),
  userId: Joi.string()
    .length(24)
    .optional(),
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
