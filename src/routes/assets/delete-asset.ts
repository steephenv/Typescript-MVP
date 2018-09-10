import { RequestHandler } from 'express';

import { Assets } from '../../models/Assets';
import { Favorites } from '../../models/Favorites';
import { Promise as BluePromise } from 'bluebird';

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

    const assetPromise = Assets.remove(req.query).exec();

    const favoritePromise = Favorites.remove({
      assetsId: req.query._id,
    });
    await BluePromise.all([assetPromise, favoritePromise]);
    return res.status(200).send({
      msg: 'asset-deleted',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
