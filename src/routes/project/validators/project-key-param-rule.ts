import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ProjectKeyParamSchema = Joi.object().keys({
  currentStatus: Joi.string().allow(''),
  currentSituation: Joi.string().allow(''),
  challengeType: Joi.string().allow(''),
  challenge: Joi.string().allow(''),
  degreeOfChallenge: Joi.string().allow(''),
  goalValueAdd: Joi.string().allow(''),
  desiredFutureSituation: Joi.string().allow(''),
  targetStart: Joi.string().allow(''),
  expectedEnd: Joi.string().allow(''),
  mainLocation: Joi.string().allow(''),
  additionalLocations: Joi.string().allow(''),
  location2: Joi.string().allow(''),
  location3: Joi.string().allow(''),
  location4: Joi.string().allow(''),
  communication: Joi.string().allow(''),
});
export const projectKeyParamRule: RequestHandler = (req, res, next) => {
  //   req.body.role = res.locals.user.role;
  Joi.validate(req.body, ProjectKeyParamSchema, { stripUnknown: true }, err => {
    // console.log();
    // delete req.body.role;
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
