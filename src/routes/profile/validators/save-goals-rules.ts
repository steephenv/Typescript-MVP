import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const GoalsSchema = Joi.object().keys({
  clientRating: Joi.string().required(),
  teamRating: Joi.string().required(),
  personalStatement: Joi.string().allow(''),
  skillTargets: Joi.array()
    .items(
      Joi.object().keys({
        skillId: Joi.string().required(),
        targetProficiency: Joi.string().required(),
      }),
    )
    .optional(),
  educationalTargets: Joi.array().items(
    Joi.object().keys({
      durationFrom: Joi.string(),
      durationTo: Joi.string(),
      typeOfInstitution: Joi.string(),
      nameOfInstitution: Joi.string(),
      locationCountry: Joi.string(),
      locationCity: Joi.string(),
      locationState: Joi.string(),
      major: Joi.string(),
      degree: Joi.string(),
    }),
  ),
  annualAvailableCapacity: Joi.number().required(),
  capricornsAvailableCapacity: Joi.number().required(),
  income: Joi.string().allow(''),
  incomeUnit: Joi.string().allow(''),
  incomePerAnnum: Joi.string().allow(''),
  incomePerMonth: Joi.string().allow(''),
  incomePerWeek: Joi.string().allow(''),
  incomePerDay: Joi.string().allow(''),
  incomePerHour: Joi.string().allow(''),
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
