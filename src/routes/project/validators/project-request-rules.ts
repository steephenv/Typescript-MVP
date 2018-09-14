import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const EnvObjectSchema = Joi.object({
  // stakeHolder: Joi.string().allow(''),
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
  desiredDailyRate: Joi.string(),
  desiredDailyRateNumber: Joi.number(),
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
  targetStart: Joi.date().required(),
  expectedEnd: Joi.date().required(),
  mainLocation: Joi.string().allow(''),
  additionalLocations: Joi.array(),
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
  clientsMessage: Joi.string().allow(''),
});

const NeedExpertAdvisorySchema = Joi.object().keys({
  _id: Joi.string().required(),
  status: Joi.string().allow(''),
  projectId: Joi.string().required(),
  templateType: Joi.string()
    .valid('NeedExpertAdvisory')
    .required(),
  topic: Joi.string().allow(''),
  myAdvisoryNeed: Joi.string().allow(''),
  earliestStartDate: Joi.date().allow(''),
  latestDueDate: Joi.date().allow(''),
});
export const projectRequestRule: RequestHandler = (req, res, next) => {
  if (!req.body.formType && !req.body.templateType) {
    return res.status(422).send({
      success: false,
      msg: 'Invalid formType',
    });
  }
  if (req.body.templateType === 'NeedExpertAdvisory') {
    Joi.validate(
      req.body,
      NeedExpertAdvisorySchema,
      { stripUnknown: true },
      err => {
        // console.log(err);
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
  } else if (req.body.formType === 'tab1') {
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
  } else if (req.body.formType === 'tab2') {
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
  } else if (req.body.formType === 'tab3') {
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
