import { RequestHandler } from 'express';

import { personalDetails } from '../../models/personalDetails';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const savePersonal: RequestHandler = async (req, res, next) => {
  try {
    // const newData = new personalDetails({
    //   firstName: req.body.firstName,
    //   middleName: req.body.middleName,
    //   lastName: req.body.lastName,
    //   foto: req.body.foto,
    //   birthDate: req.body.birthDate,
    //   countryOfBirth: req.body.countryOfBirth,
    //   citizenship: req.body.citizenship,
    //   workPermit: req.body.workPermit,
    //   professionalId: req.body.professionalId,
    //   country: req.body.country,
    //   city: req.body.city,
    //   street: req.body.street,
    //   zipCode: req.body.zipCode,
    //   houseNo: req.body.houseNo,
    //   countryDialingCode: req.body.countryDialingCode,
    //   cityDialingCode: req.body.cityDialingCode,
    //   fixedLinePhone: req.body.fixedLinePhone,
    //   mobilePhone: req.body.mobilePhone,
    //   primaryEmail: req.body.primaryEmail,
    //   secondaryEmail: req.body.secondaryEmail,
    //   taxId: req.body.taxId,
    //   vatId: req.body.vatId,
    //   socialInsuranceId: req.body.socialInsuranceId,
    //   healthInsuranceType: req.body.healthInsuranceType,
    //   healthInsurance: req.body.healthInsurance,
    //   ibanNo: req.body.ibanNo,
    //   bicNo: req.body.bicNo,
    //   createdAt: new Date(),
    // });
    // const saved = await newData.save();

    const criteria = {
      userId: req.params.userId,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      foto: req.body.foto,
      birthDate: req.body.birthDate,
      countryOfBirth: req.body.countryOfBirth,
      citizenship: req.body.citizenship,
      workPermit: req.body.workPermit,
      professionalId: req.body.professionalId,
      country: req.body.country,
      city: req.body.city,
      street: req.body.street,
      zipCode: req.body.zipCode,
      houseNo: req.body.houseNo,
      countryDialingCode: req.body.countryDialingCode,
      cityDialingCode: req.body.cityDialingCode,
      fixedLinePhone: req.body.fixedLinePhone,
      mobilePhone: req.body.mobilePhone,
      primaryEmail: req.body.primaryEmail,
      secondaryEmail: req.body.secondaryEmail,
      taxId: req.body.taxId,
      vatId: req.body.vatId,
      socialInsuranceId: req.body.socialInsuranceId,
      healthInsuranceType: req.body.healthInsuranceType,
      healthInsurance: req.body.healthInsurance,
      ibanNo: req.body.ibanNo,
      bicNo: req.body.bicNo,
      createdAt: new Date(),
    };

    await personalDetails.findOneAndUpdate(req.query, {
      $set: { criteria },
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
