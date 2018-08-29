import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Industry } from '../../models/Industries';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listIndustries: RequestHandler = async (req, res, next) => {
  try {
    const limit = req.query._limit || 50;
    const skip = req.query._skip || 0;
    delete req.query._limit;
    delete req.query._skip;

    const [industries, totalIndustriesCount] = await BluePromise.all([
      Industry.find(req.query)
        .limit(limit)
        .skip(skip)
        .exec(),
      Industry.count({}).exec(),
    ]);
    return res.status(200).send({
      success: true,
      industries,
      totalIndustriesCount,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
