import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const subSchema = Joi.object().keys({
  subCategory: Joi.string().required(),
  _id: Joi.string().optional(),
});
const SaveProjectCategorySchema = Joi.object().keys({
  category: Joi.string().required(),
  subCategories: Joi.array()
    .items(subSchema)
    .min(1)
    .required(),
});
const UpdateProjectCategorySchema = Joi.object().keys({
  category: Joi.string().required(),
  _id: Joi.string().required(),
  subCategories: Joi.array()
    .items(subSchema)
    .min(1)
    .required(),
});
export const saveProjectCategoryRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    SaveProjectCategorySchema,
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
export const updateProjectCategoryRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    UpdateProjectCategorySchema,
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
