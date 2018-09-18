import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const SetCallSchema = Joi.object().keys({
  typeOfCall: Joi.string()
    .required()
    .valid('project', 'registration'),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  otherDetails: Joi.string().optional(),
  projectName: Joi.string().when('typeOfCall', {
    is: 'project',
    then: Joi.required(),
  }),
  userId: Joi.string().optional(),
  mobile: Joi.string().required(),
  offset: Joi.string().when('typeOfCall', {
    is: 'project',
    then: Joi.required(),
  }),
  hoursArray: Joi.array()
    .items(Joi.number())
    .when('typeOfCall', {
      is: 'project',
      then: Joi.required(),
    }),
});
export const setCallRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, SetCallSchema, err => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
