import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ProjectSchema = Joi.object().keys({
  engagementFrom: Joi.string().required(),
  engagementTo: Joi.string().required(),
  engagementAs: Joi.string().required(),
  projectName: Joi.string().required(),
  clientsCompanyName: Joi.string().required(),
  projectCompanyIndustryLine: Joi.string().required(),
  clientsCompanySize: Joi.string().required(),
  projectCountry: Joi.string().required(),
  projectCity: Joi.string().required(),
  projectBusinessFunction: Joi.string().required(),
  projectGoal: Joi.string().required(),
  projectDuration: Joi.string().required(),
  projectSize: Joi.string().required(),
  projectComplexity: Joi.string().required(),
  projectRegionalReach: Joi.string().required(),
  role: Joi.string().required(),
  projectTeamSize: Joi.number().required(),
  projectBudgetResponsibility: Joi.number().required(),
  mainResults: Joi.string().required(),
  applicableToOtherCompanies: Joi.string().required(),
});
const ExperienceDataSchema = Joi.object().keys({
  durationFrom: Joi.string().required(),
  durationTo: Joi.string().required(),
  typeOfEngagement: Joi.string().required(),
  jobTitle: Joi.string().required(),
  businessFunction: Joi.string().required(),
  companyName: Joi.string().required(),
  companyIndustryLine: Joi.string().required(),
  companySize: Joi.string().required(),
  locationCountry: Joi.string().required(),
  locationCity: Joi.string().required(),
  mainResponsibility: Joi.string().required(),
  peopleManagementResponsibility: Joi.string().required(),
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
