import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const EnvObjectSchema = Joi.object({
  stakeHolder: Joi.string().allow(''),
  businessFunction: Joi.string().allow(''),
  businessFunctionRole: Joi.string().allow(''),
});

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

const ProjectRequestSchema = Joi.object().keys({
  _id: Joi.string().required(),
  currentStatus: Joi.string().allow(''),
  currentSituation: Joi.string().allow(''),
  challengeType: Joi.string().allow(''),
  challenge: Joi.string().allow(''),
  degreeOfChallenge: Joi.string().allow(''),
  goalValueAdd: Joi.string().allow(''),
  desiredFutureSituation: Joi.string().allow(''),
  targetStart: Joi.string().allow(''),
  expectedEnd: Joi.string().allow(''),
  mainLocation: Joi.string().allow(''),
  additionalLocations: Joi.string().allow(''),
  location2: Joi.string().allow(''),
  location3: Joi.string().allow(''),
  location4: Joi.string().allow(''),
  communication: Joi.string().allow(''),
});

// tslint:disable:variable-name
const ProjectEnvironmentSchema = Joi.object().keys({
  _id: Joi.string().required(),
  stakeHolders: Joi.array().items(EnvObjectSchema),
  sponsorsPosition: Joi.string().allow(''),
  managersPosition: Joi.string().allow(''),
});

const ProjectSupportNeedSchema = Joi.object().keys({
  _id: Joi.string().required(),
  templateType: Joi.string()
    .valid('SkillBased', 'DeliverableBased', 'ReadyToUse')
    .required(),
  roleAndResponsibility: Joi.array().items(roleAndRespSchema),
  skillsAndExperience: Joi.array().items(skillsAndExpSchema),
  clientMessage: Joi.string().allow(''),
});

export const projectRequestRule: RequestHandler = (req, res, next) => {
  if (!req.body.formType) {
    return res.status(422).send({
      success: false,
      msg: 'Invalid formType',
    });
  }
  if (req.body.formType === 'keyParams') {
    Joi.validate(
      req.body,
      ProjectRequestSchema,
      { stripUnknown: true },
      err => {
        // console.log();
        // delete req.body.role;
        if (err) {
          // console.log(err);
          return res.status(422).send({
            success: false,
            msg: err,
          });
        }
        return next();
      },
    );
  } else if (req.body.formType === 'projectEnvironment') {
    Joi.validate(
      req.body,
      ProjectEnvironmentSchema,
      { stripUnknown: true },
      err => {
        // console.log();
        // delete req.body.role;
        if (err) {
          return res.status(422).send({
            success: false,
            msg: err,
          });
        }
        return next();
      },
    );
  } else if (req.body.formType === 'projectSupportNeed') {
    Joi.validate(
      req.body,
      ProjectSupportNeedSchema,
      { stripUnknown: true },
      err => {
        // console.log();
        // delete req.body.role;
        if (err) {
          return res.status(422).send({
            success: false,
            msg: err,
          });
        }
        return next();
      },
    );
  } else {
    return res.status(422).send({
      success: false,
      msg: 'Invalid formType',
    });
  }
};
