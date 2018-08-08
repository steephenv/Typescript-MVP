import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const GoalsSchema = Joi.object().keys({
  clientRating: Joi.string().required(),
  teamRating: Joi.string().required(),
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
      durationFrom: Joi.string().optional(),
      activities: Joi.string().optional(),
      durationTo: Joi.string().optional(),
      typeOfInstitution: Joi.string().optional(),
      nameOfInstitution: Joi.string().optional(),
      locationCountry: Joi.string().optional(),
      locationCity: Joi.string().optional(),
      locationState: Joi.string().optional(),
      major: Joi.string().optional(),
      degree: Joi.string().optional(),
      grade: Joi.string().optional(),
      subject: Joi.string().optional(),
      subjectGrade: Joi.string().optional(),
    }),
  ),
  annualAvailableCapacity: Joi.number().required(),
  capricornsAvailableCapacity: Joi.number().required(),
  income: Joi.number().allow(''),
  incomePerAnnum: Joi.number().required(),
  incomePerMonth: Joi.number().required(),
  incomePerDay: Joi.number().required(),
  startDate: Joi.string().required(),
  remainingIncome: Joi.number().optional(),
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
