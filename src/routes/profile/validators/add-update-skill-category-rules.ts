import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const subSchema = Joi.object().keys({
  subCategory: Joi.string().required(),
  _id: Joi.string().optional(),
});
const SaveSkillCategorySchema = Joi.object().keys({
  category: Joi.string().required(),
  cluster: Joi.string().required(),
  subCategories: Joi.array()
    .items(subSchema)
    .min(1)
    .required(),
});
const UpdateSkillCategorySchema = Joi.object().keys({
  category: Joi.string().required(),
  _id: Joi.string().required(),
  subCategories: Joi.array()
    .items(subSchema)
    .min(1)
    .required(),
});
export const saveSkillCategoryRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    SaveSkillCategorySchema,
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
export const updateSkillCategoryRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    UpdateSkillCategorySchema,
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
