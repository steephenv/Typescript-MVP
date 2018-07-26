import { RequestHandler } from 'express';
import { BusinessSubFunction } from '../../models/Business-sub-function';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listBusinessSubFunction: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const subFunctions = await BusinessSubFunction.find(req.query).exec();

    return res.status(200).send({
      success: true,
      subFunctions,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
