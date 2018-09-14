import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ProjectDraftSchema = Joi.object().keys({
  projectName: Joi.string().optional(),
  userId: Joi.string().required(),
  timeForCall: Joi.string().required(),
  otherDetails: Joi.string().optional(),
  mobile: Joi.string().required(),
});
export const setCallRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, ProjectDraftSchema, err => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
