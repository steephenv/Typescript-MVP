import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const ExperianceDataSchema = Joi.object().keys({
  from: Joi.string().required(),
  to: Joi.string().required(),
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
  managedTeamSize: Joi.string().required(),
  budgetResponsibility: Joi.string().required(),

  projectfrom: Joi.string().required(),
  projectto: Joi.string().required(),
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
  yourRole: Joi.string().required(),
  projectteamSize: Joi.string().required(),
  projectBudgetResponsibility: Joi.string().required(),
  yourMainResults: Joi.string().required(),
  applicableToOtherCompanies: Joi.string().required(),
});

export const saveExperianceRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, ExperianceDataSchema, { stripUnknown: true }, err => {
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
