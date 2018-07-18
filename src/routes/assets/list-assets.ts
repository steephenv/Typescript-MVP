import { RequestHandler } from 'express';

import { Assets } from '../../models/Assets';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listAssets: RequestHandler = async (req, res, next) => {
  try {
    const { _limit = 50, _skip = 0 } = req.query;

    delete req.query._limit;
    delete req.query._offset;

    const assets = await Assets.find(req.query)
      .skip(_skip)
      .limit(_limit)
      .exec();

    return res.status(200).send({
      msg: 'success',
      assets,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
