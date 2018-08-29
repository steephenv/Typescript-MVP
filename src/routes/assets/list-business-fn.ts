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
    const limit = req.query._limit || 50;
    const skip = req.query._skip || 0;
    delete req.query._limit;
    delete req.query._skip;

    // quick validation
    if (isNaN(limit) || isNaN(skip)) {
      return next(
        new RequestError(
          RequestErrorType.UNPROCESSABLE_ENTITY,
          'limit and skip should be numbers',
        ),
      );
    }

    const businessFunctions: any[] = await BusinessFunction.find({})
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();

    const bussSubFnsP = BluePromise.map(businessFunctions, fn =>
      BusinessSubFunction.find({
        businessFunctionId: fn._id,
      })
        .lean()
        .exec(),
    );

    const totalBusinessFunctionsCountP = BusinessFunction.count({}).exec();

    const [bussSubFns, totalBusinessFunctionsCount] = await BluePromise.all([
      bussSubFnsP,
      totalBusinessFunctionsCountP,
    ]);

    // attach stuffs
    businessFunctions.forEach((fn, i) => (fn.subFunctions = bussSubFns[i]));

    return res.status(200).send({
      success: true,
      businessFunctions,
      totalBusinessFunctionsCount,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
