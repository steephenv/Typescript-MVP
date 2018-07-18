import * as Joi from 'joi';
import { RequestHandler } from 'express';
const skillsAndExpSchema = Joi.object({
  role: Joi.string().allow(''),
  yearsOfProfessionalExp: Joi.string().allow(''),
  clientsIndustryExp: Joi.string().allow(''),
  clientsCompanyExp: Joi.string().allow(''),
  businessFunction: Joi.string().allow(''),
  functional: Joi.array(),
  personal: Joi.array(),
  leadership: Joi.array(),
  entrepreneurship: Joi.array(),
  desiredDailyRate: Joi.number(),
  travellingExpensePercentage: Joi.string().allow(''),
  proposalSelectionMode: Joi.string().allow(''),
});
const roleAndRespSchema = Joi.object({
  consultant: Joi.string().allow(''),
  requiredHeadCount: Joi.string().allow(''),
  requiredRole: Joi.string().allow(''),
  mainResponsibility: Joi.string().allow(''),
  engagementStart: Joi.string().allow(''),
  engagementEnd: Joi.string().allow(''),
  reqCapacityWorkDays: Joi.string().allow(''),
  reqCapacityInFTE: Joi.string().allow(''),
  avgCapacityPerWeek: Joi.string().allow(''),
  confirmAvgCapacity: Joi.string().allow(''),
  onsiteAvailability: Joi.string().allow(''),
  travellingRequired: Joi.string().allow(''),
  travellingToLocations: Joi.array(),
  travellingFrequency: Joi.string().allow(''),
});
const objectSchema = Joi.object({
  roleAndResponsibility: Joi.array().items(roleAndRespSchema),
  skillsAndExperience: Joi.array().items(skillsAndExpSchema),
  clientsMessage: Joi.string().allow(''),
}).required();
// tslint:disable:variable-name
// const ProjectSupportSchema = Joi.object().keys({
//   educations: Joi.array()
//     .items(objectSchema)
//     .min(1)
//     .required(),
// });

export const projectSupportValidation: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, objectSchema, { stripUnknown: true }, (err: any) => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
