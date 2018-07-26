import { RequestHandler } from 'express';

import { Assets } from '../../models/Assets';

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

    let assets: any[];

    // determine the fn to activate
    if (req.query.keyQuery) {
      assets = await regexKeySearch(req.query, _limit, _skip);
    } else {
      assets = await normalFind(req.query, _limit, _skip);
    }

    return res.status(200).send({
      msg: 'success',
      assets,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

// usual query
async function normalFind(query: any, limit: number, skip: number) {
  const assets = await Assets.find(query)
    .skip(skip)
    .limit(limit)
    .exec();

  return assets;
}

// regex key search
async function regexKeySearch(reqQuery: any, limit: number, skip: number) {
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

  const assets = await Assets.find(condition)
    .skip(skip)
    .limit(limit)
    .exec();

  return assets;
}

function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
