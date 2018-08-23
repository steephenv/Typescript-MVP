import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const PersonalDataSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  middleName: Joi.string().allow(''),
  lastName: Joi.string().required(),
  role: Joi.string().required(),
  image: Joi.string().allow(''),
  birthDate: Joi.string().required(),
  countryOfBirth: Joi.string().allow(''),
  citizenship: Joi.string().allow(''),
  workPermit: Joi.string().allow(''),
  country: Joi.string().required(),
  state: Joi.string().optional(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  zipCode: Joi.string().optional(),
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
    .when('role', { is: 'Consultant', then: Joi.required() })
    .when('role', { is: 'Employee', then: Joi.required() }),
  bicNo: Joi.string()
    .when('role', { is: 'Consultant', then: Joi.required() })
    .when('role', { is: 'Employee', then: Joi.required() }),
  personalStatement: Joi.string().allow(''),
  summary: Joi.string().allow(''),
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
