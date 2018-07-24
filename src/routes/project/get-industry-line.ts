import { RequestHandler } from 'express';
import { IndustryLine } from '../../models/IndustryLine';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getIndustryLine: RequestHandler = async (req, res, next) => {
  try {
    const industry = await IndustryLine.find({}).exec();
    return res.status(200).send({
      success: true,
      IndustryLine: industry,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
