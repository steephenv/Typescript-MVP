import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const PersonalDataSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  middleName: Joi.string().allow(''),
  lastName: Joi.string().required(),
  role: Joi.string().required(),
  image: Joi.string().allow(''),
  birthDate: Joi.date().required(),
  countryOfBirth: Joi.string().allow(''),
  citizenship: Joi.string().required(),
  workPermit: Joi.string(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  zipCode: Joi.string().required(),
  houseNo: Joi.string().required(),
  countryDialingCode: Joi.number().required(),
  cityDialingCode: Joi.number().required(),
  fixedLinePhone: Joi.string().required(),
  mobilePhone: Joi.string().required(),
  primaryEmail: Joi.string().required(),
  secondaryEmail: Joi.string().required(),
  taxId: Joi.string()
    .when('role', { is: 'Consultant', then: Joi.required() })
    .when('role', { is: 'Employee', then: Joi.required() }),
  vatId: Joi.number().when('role', { is: 'Consultant', then: Joi.required() }),
  socialInsuranceId: Joi.number().when('role', {
    is: 'Employee',
    then: Joi.required(),
  }),
  healthInsuranceType: Joi.string().when('role', {
    is: 'Employee',
    then: Joi.required(),
  }),
  healthInsurance: Joi.string().when('role', {
    is: 'Employee',
    then: Joi.required(),
  }),
  ibanNo: Joi.string()
    .required()
    .when('role', { is: 'Consultant', then: Joi.required() })
    .when('role', { is: 'Employee', then: Joi.required() }),
  bicNo: Joi.string()
    .required()
    .when('role', { is: 'Consultant', then: Joi.required() })
    .when('role', { is: 'Employee', then: Joi.required() }),
  personalStatement: Joi.string(),
  summary: Joi.string(),
  maidenName: Joi.string().allow(''),
});

export const savePersonalRule: RequestHandler = (req, res, next) => {
  req.body.role = res.locals.user.role;
  Joi.validate(req.body, PersonalDataSchema, { stripUnknown: true }, err => {
    // console.log();
    delete req.body.role;
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
