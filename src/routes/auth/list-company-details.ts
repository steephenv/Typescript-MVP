import { RequestHandler } from 'express';

import { Company } from '../../models/Company';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listCompanyDetails: RequestHandler = async (req, res, next) => {
  try {
    const companyDetails = await Company.find({}).exec();
    return res.status(200).send({ success: true, data: companyDetails });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
