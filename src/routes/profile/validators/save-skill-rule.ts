import * as Joi from 'joi';
import { RequestHandler } from 'express';

import { messages } from '../../../config/app/messages';

const objectSchema = Joi.object({
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  skill: Joi.string().required(),
  proficiency: Joi.string().required(),
  description: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
  certificate: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
  lastApplied: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
}).required();

// tslint:disable-next-line
const SkillSchema = Joi.object().keys({
  skills: Joi.array()
    .items(objectSchema)
    .min(1)
    .required(),
});

export const skillValidation: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, SkillSchema, { stripUnknown: true }, (err: any) => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    req.body.createdAt = new Date();
    next();
  });
};
