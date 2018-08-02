import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ProjectSchema = Joi.object().keys({
  projectTitle: Joi.string().required(),
  currentSituation: Joi.string().required(),
  targetSituation: Joi.string().required(),
  targetGroup: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string(),
  industryLine: Joi.string().required(),
  businessFunctions: Joi.string().required(),
  businessSubFunctions: Joi.string(),
  projectStages: Joi.string().required(),
  technology: Joi.string().required(),
  projectMaturity: Joi.string().required(),
  effort: Joi.string().required(),
  price: Joi.number().required(),
  impact: Joi.string().required(),
  impactLevel: Joi.string().required(),
  picture: Joi.string(),
  referenceIndustry: Joi.string().required(),
  referenceClientTypes: Joi.string().required(),
  referenceProjectDate: Joi.date(),
  referenceCountry: Joi.string().required(),
  referenceLanguage: Joi.string().required(),
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
