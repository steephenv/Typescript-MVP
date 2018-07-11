import * as Joi from 'joi';
import { RequestHandler } from 'express';

const wlbSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  annualAvailableCapacity: Joi.string().required(),
  frequencyOnsiteWork: Joi.string().required(),
  frequencyHomeOfficeWork: Joi.string().required(),
  location: Joi.string().required(),
  workpermit: Joi.string(),
});

export const saveWLBRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, wlbSchema, { stripUnknown: true }, (err: any) => {
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
