import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const GoalsSchema = Joi.object().keys({
  clientRating: Joi.string().required(),
  teamRating: Joi.string().required(),
  personalStatement: Joi.string().allow(''),
  industryExperience: Joi.array(),
  functionalExperience: Joi.array(),
  subjectMatter: Joi.array(),
  taskExperience: Joi.array(),
  certifications: Joi.array(),
  assets: Joi.array(),
  educationalTarget: Joi.array(),
  socialSkills: Joi.array(),
  peopleDevelopment: Joi.array(),
  businessDevelopment: Joi.array(),
  annualAvailableCapacity: Joi.string().allow(''),
  capricornsAvailableCapacity: Joi.string().allow(''),
  income: Joi.string().allow(''),
  incomeUnit: Joi.string().allow(''),
  startDate: Joi.string().allow(''),
  daysLeftInYear: Joi.number(),
  daysLeftInCapricorns: Joi.number(),
  targetAnnualIncome: Joi.number(),
  targetAnnualIncomeCapricorns: Joi.number(),
});

export const saveGoalRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, GoalsSchema, { stripUnknown: true }, err => {
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
