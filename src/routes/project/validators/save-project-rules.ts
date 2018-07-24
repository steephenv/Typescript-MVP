import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ProjectSchema = Joi.object().keys({
  projectTittle: Joi.string().allow(''),
  currentSituation: Joi.string().allow(''),
  targetSituation: Joi.string().allow(''),
  targetGroup: Joi.string().allow(''),
  category: Joi.string().allow(''),
  subCategory: Joi.string().allow(''),
  industryLine: Joi.string().allow(''),
  businessFunctions: Joi.string().allow(''),
  businessSubFunctions: Joi.string().allow(''),
  projectStages: Joi.string().allow(''),
  technology: Joi.string().allow(''),
  projectMaturity: Joi.string().allow(''),
  effort: Joi.string().allow(''),
  price: Joi.number(),
  impact: Joi.string().allow(''),
  impactLevel: Joi.string().allow(''),
  picture: Joi.string().allow(''),
  referenceIndustry: Joi.string().allow(''),
  referenceClientTypes: Joi.string().allow(''),
  referenceProjectDate: Joi.date(),
  referenceCountry: Joi.string().allow(''),
  referenceLanguage: Joi.string().allow(''),
  categoryId: Joi.string().allow(''),
});
export const saveProjectRule: RequestHandler = (req, res, next) => {
  //   req.body.role = res.locals.user.role;
  Joi.validate(req.body, ProjectSchema, { stripUnknown: true }, err => {
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
