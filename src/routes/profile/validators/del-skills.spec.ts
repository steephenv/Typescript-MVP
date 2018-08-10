import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const DeleteSkillsSchema = Joi.object().keys({
  ids: Joi.array().required(),
});

export const deleteSkillsRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, DeleteSkillsSchema, { stripUnknown: true }, err => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
