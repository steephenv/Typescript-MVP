import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { Favorites } from '../../models/Favorites';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveFavorites: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};
    where.userId = req.body.userId ? req.body.userId : res.locals.user.userId;
    // req.body.updatedAt = new Date();
    // req.body.userId = where.userId;
    // req.body.createdAt = new Date();
    await BluePromise.map(req.body.items, async (item: any) => {
      item.updatedAt = new Date();
      item.userId = where.userId;
      item.createdAt = new Date();
      const newData = new Favorites(item);
      await newData.save();
    });
    // const favoriteData = new Favorites(req.body);
    // await favoriteData.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
export const deleteFavorites: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};
    where.userId = req.body.userId ? req.body.userId : res.locals.user.userId;
    await BluePromise.map(req.body.items, async (item: any) => {
      item.updatedAt = new Date();
      item.userId = where.userId;
      item.createdAt = new Date();
      await Favorites.findOneAndRemove(req.body);
      // const newData = new Favorites(item);
      // await newData.save();
    });
    // req.body.userId = where.userId;
    // await Favorites.findOneAndRemove(req.body);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
