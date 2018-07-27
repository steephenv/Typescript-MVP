import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const DeleteSkillCategorySchema = Joi.object().keys({
  model: Joi.string()
    .valid('category', 'subcategory')
    .required(),
  ids: Joi.array().required(),
});

export const deleteSkillCategoryRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    DeleteSkillCategorySchema,
    { stripUnknown: true },
    err => {
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
