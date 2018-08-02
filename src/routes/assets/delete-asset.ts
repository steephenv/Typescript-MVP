import { RequestHandler } from 'express';

import { Assets } from '../../models/Assets';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const deleteAssets: RequestHandler = async (req, res, next) => {
  try {
    if (!Object.keys(req.query).length) {
      return next(
        new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, 'no params'),
      );
    }

    const resp = await Assets.remove(req.query).exec();

    return res.status(200).send({
      msg: 'asset-deleted',
      resp,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
