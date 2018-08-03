import { RequestHandler } from 'express';

import { Favorites } from '../../models/Favorites';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveFavorites: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};
    where.userId = req.body.userId ? req.body.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    req.body.createdAt = new Date();
    const favoriteData = new Favorites(req.body);
    await favoriteData.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
export const deleteFavorites: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};
    where.userId = req.body.userId ? req.body.userId : res.locals.user.userId;
    req.body.userId = where.userId;
    await Favorites.findOneAndRemove(req.body);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
