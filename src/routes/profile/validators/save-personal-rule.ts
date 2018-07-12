import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const PersonalDataSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  middleName: Joi.string().allow(''),
  lastName: Joi.string().required(),
  image: Joi.string().allow(''),
  birthDate: Joi.date().required(),
  countryOfBirth: Joi.string().allow(''),
  citizenship: Joi.string().required(),
  workPermit: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  pinCode: Joi.string().required(),
  houseNo: Joi.string().required(),
  countryDialingCode: Joi.string().required(),
  cityDialingCode: Joi.string().required(),
  fixedLinePhone: Joi.string().required(),
  mobilePhone: Joi.string().required(),
  primaryEmail: Joi.string().required(),
  secondaryEmail: Joi.string().required(),
  taxId: Joi.string().required(),
  vatId: Joi.string().required(),
  socialInsuranceId: Joi.string().required(),
  healthInsuranceType: Joi.string().required(),
  healthInsurance: Joi.string().required(),
  ibanNo: Joi.string().required(),
  bicNo: Joi.string().required(),
  personalStatement: Joi.string(),
  summary: Joi.string().required(),
  maidenName: Joi.string().allow(''),
});

export const savePersonalRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, PersonalDataSchema, { stripUnknown: true }, err => {
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
