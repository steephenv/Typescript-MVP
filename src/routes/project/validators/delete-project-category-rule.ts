import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const DeleteProjectCategorySchema = Joi.object().keys({
  model: Joi.string()
    .valid('category', 'subcategory')
    .required(),
  _id: Joi.string().required(),
});

export const deleteProjectCategoryRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    DeleteProjectCategorySchema,
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
