import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable-next-line
const PersonalDataSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  foto: Joi.string(),
  birthDate: Joi.date().required(),
  countryOfBirth: Joi.string(),
  citizenship: Joi.string().required(),
  workPermit: Joi.string().required(),
  professionalId: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  pinCode: Joi.number().required(),
  houseNo: Joi.number().required(),
  countryDialingCode: Joi.number().required(),
  cityDialingCode: Joi.number().required(),
  fixedLinePhone: Joi.number().required(),
  mobilePhone: Joi.number().required(),
  primaryEmail: Joi.string().required(),
  secondaryEmail: Joi.string().required(),
  taxId: Joi.string().required(),
  vatId: Joi.string().required(),
  socialInsuranceId: Joi.string().required(),
  healthInsuranceType: Joi.string().required(),
  healthInsurance: Joi.string().required(),
  ibanNo: Joi.string().required(),
  bicNo: Joi.string().required(),
});

export const savePersonalRule: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    PersonalDataSchema,
    { stripUnknown: true },
    (err: any) => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      req.body.createdAt = new Date();
      next();
    },
  );
};
