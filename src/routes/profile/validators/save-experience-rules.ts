import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ProjectSchema = Joi.object().keys({
  engagementFrom: Joi.string()
    .required()
    .allow(''),
  engagementTo: Joi.string()
    .required()
    .allow(''),
  engagementAs: Joi.string()
    .required()
    .allow(''),
  projectName: Joi.string()
    .required()
    .allow(''),
  clientsCompanyName: Joi.string()
    .required()
    .allow(''),
  projectCompanyIndustryLine: Joi.string()
    .required()
    .allow(''),
  clientsCompanySize: Joi.string()
    .required()
    .allow(''),
  projectCountry: Joi.string()
    .required()
    .allow(''),
  projectCity: Joi.string()
    .required()
    .allow(''),
  projectBusinessFunction: Joi.string()
    .required()
    .allow(''),
  projectGoal: Joi.string()
    .required()
    .allow(''),
  projectDuration: Joi.string()
    .required()
    .allow(''),
  projectSize: Joi.string()
    .required()
    .allow(''),
  projectComplexity: Joi.string()
    .required()
    .allow(''),
  projectRegionalReach: Joi.string()
    .required()
    .allow(''),
  role: Joi.string()
    .required()
    .allow(''),
  projectTeamSize: Joi.number().required(),
  projectBudgetResponsibility: Joi.number().required(),
  mainResults: Joi.string()
    .required()
    .allow(''),
  applicableToOtherCompanies: Joi.string()
    .required()
    .allow(''),
});
const ExperienceDataSchema = Joi.object().keys({
  durationFrom: Joi.string()
    .required()
    .allow(''),
  durationTo: Joi.string()
    .required()
    .allow(''),
  typeOfEngagement: Joi.string()
    .required()
    .allow(''),
  jobTitle: Joi.string()
    .required()
    .allow(''),
  businessFunction: Joi.string()
    .required()
    .allow(''),
  companyName: Joi.string()
    .required()
    .allow(''),
  companyIndustryLine: Joi.string()
    .required()
    .allow(''),
  companySize: Joi.string()
    .required()
    .allow(''),
  locationCountry: Joi.string()
    .required()
    .allow(''),
  locationCity: Joi.string()
    .required()
    .allow(''),
  mainResponsibility: Joi.string()
    .required()
    .allow(''),
  peopleManagementResponsibility: Joi.string()
    .required()
    .allow(''),
  managedTeamSize: Joi.number().required(),
  budgetResponsibility: Joi.number().required(),
});

const expSchema = Joi.object().keys({
  experiences: Joi.array()
    .items(ExperienceDataSchema)
    .required(),
  projects: Joi.array()
    .items(ProjectSchema)
    .required(),
});
export const saveExperienceRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, expSchema, { stripUnknown: true }, err => {
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
