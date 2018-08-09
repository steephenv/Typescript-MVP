import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Assets } from '../../models/Assets';
import { Favorites } from '../../models/Favorites';

import { escapeRegex } from '../../utils/escape-regex';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

// route handler
export const listAssets: RequestHandler = async (req, res, next) => {
  try {
    const { _limit = 50, _skip = 0 } = req.query;

    delete req.query._limit;
    delete req.query._skip;

    // init
    let assets: any[] = null;
    let count: number = null;

    // determine the fn to activate
    if (req.query.keyQuery) {
      const result = await regexKeySearch(req.query, _limit, _skip);
      assets = result.assets;
      count = result.count;
    } else {
      const result = await normalFind(req.query, _limit, _skip);
      assets = result.assets;
      count = result.count;
    }

    const userIdForListingFavs: string = req.query.userId
      ? req.query.userId
      : res.locals.user
        ? res.locals.user.userId
        : null;

    if (userIdForListingFavs) {
      assets = await attachFavoritesFlag(assets, userIdForListingFavs);
    }

    return res.status(200).send({
      msg: 'success',
      count,
      assets,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

// attach favorites flag for assets
async function attachFavoritesFlag(assets: any[], userId: string) {
  const assetsMapped = await BluePromise.map(assets, async asset => {
    const isFavorite = await Favorites.count({
      userId,
      type: 'asset',
      assetsId: asset._id,
    }).exec();

    if (isFavorite) {
      asset.favorite = true;
    } else {
      asset.favorite = false;
    }
    return asset;
  });

  return assetsMapped;
}

// usual query
async function normalFind(query: any, limit: number, skip: number) {
  // exclude user id if exUserId field is present
  if (query.exUserId) {
    const exUserId: string = query.exUserId || null;
    query.userId = { $ne: exUserId };
    delete query.exUserId;
  }

  const assetsPromise = Assets.find(query)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
  const countPromise = Assets.count(query).exec();

  const [assets, count] = await BluePromise.all([assetsPromise, countPromise]);

  return { assets, count };
}

// regex key search
async function regexKeySearch(reqQuery: any, limit: number, skip: number) {
  // exclude user id if exUserId field is present
  if (reqQuery.exUserId) {
    const exUserId: string = reqQuery.exUserId || null;
    reqQuery.userId = { $ne: exUserId };
    delete reqQuery.exUserId;
  }

  const key: string = reqQuery.keyQuery;
  delete reqQuery.keyQuery;

  const text = escapeRegex(key);
  const regex = new RegExp(text, 'gi');

  // make condition
  const condition = Object.assign(
    {},
    {
      $or: [{ title: regex }],
    },
    reqQuery,
  );

  const assetsPromise = Assets.find(condition)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  const countPromise = Assets.count(condition).exec();

  const [assets, count] = await BluePromise.all([assetsPromise, countPromise]);

  return { assets, count };
}
