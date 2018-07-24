import { RequestHandler } from 'express';
import { BusinessFunction } from '../../models/BusinessFunction';
import { BusinessSubFunction } from '../../models/BusinessSubFunction';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getBusinessFunction: RequestHandler = async (req, res, next) => {
  try {
    const businessFn = await BusinessFunction.find({}).exec();
    return res.status(200).send({
      success: true,
      businessFunctions: businessFn,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
export const getBusSubFunction: RequestHandler = async (req, res, next) => {
  try {
    const subFunctions = await BusinessSubFunction.find({
      categoryId: req.query.categoryId,
    }).exec();
    return res.status(200).send({
      success: true,
      BusSubFunctions: subFunctions,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
