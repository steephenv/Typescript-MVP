import { RequestHandler } from 'express';
import { Industry } from '../../models/Industries';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listIndustries: RequestHandler = async (req, res, next) => {
  try {
    const ins = await Industry.find(req.query).exec();
    return res.status(200).send({
      success: true,
      industries: ins,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
