import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const wlbDataSchema = Joi.object().keys({
  annualAvailableCapacity: Joi.number().required(),
  capricornsAvailableCapacity: Joi.number().required(),
  frequencyOnsiteWork: Joi.number().required(),
  frequencyHomeOfficeWork: Joi.number().required(),
  location: Joi.array().required(),
  workPermit: Joi.string().allow(''),
  daysInYear: Joi.number().required(),
  daysInCapricornsYear: Joi.number().required(),
  fileName: Joi.string()
    .optional()
    .allow(''),
});

export const saveWLBRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, wlbDataSchema, { stripUnknown: true }, err => {
    // console.log();
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
