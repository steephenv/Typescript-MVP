import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const adminSkillSchema = Joi.object().keys({
  categoryId: Joi.string().required(),
});

export const getAdminSkillsRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.query, adminSkillSchema, { stripUnknown: true }, err => {
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
