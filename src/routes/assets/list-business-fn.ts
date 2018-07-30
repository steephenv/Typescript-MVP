import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { BusinessFunction } from '../../models/Business-function';
import { BusinessSubFunction } from '../../models/Business-sub-function';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listBusinessFns: RequestHandler = async (req, res, next) => {
  try {
    const businessFunctions: any[] = await BusinessFunction.find({})
      .lean()
      .exec();

    const bussSubFns = await BluePromise.map(businessFunctions, fn =>
      BusinessSubFunction.find({
        businessFunctionId: fn._id,
      })
        .lean()
        .exec(),
    );

    businessFunctions.forEach((fn, i) => (fn.subFunctions = bussSubFns[i]));

    return res.status(200).send({
      success: true,
      businessFunctions,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
