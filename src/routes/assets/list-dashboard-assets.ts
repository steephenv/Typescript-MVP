import { RequestHandler } from 'express';
import { Viewed } from '../../models/View';
import { Assets } from '../../models/Assets';
import { Downloaded } from '../../models/Downloads';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listDownloadedViewed: RequestHandler = async (req, res, next) => {
  try {
    let totalCount;
    const { _limit = 50, _skip = 0 } = req.query;
    delete req.query._limit;
    delete req.query._skip;
    if (!req.query && req.query.modelType) {
      return res.status(400).send({
        success: false,
        msg: 'invalid query',
      });
    }
    if (req.query.modelType === 'downloaded') {
      let assetIds;
      if (res.locals.user.role === 'Admin') {
        assetIds = await Downloaded.find({
          downloadedUserId: { $ne: res.locals.user.userId },
        })
          .distinct('assetId')
          .exec();
      } else {
        assetIds = await Downloaded.find({
          userId: res.locals.user.userId,
          downloadedUserId: { $ne: res.locals.user.userId },
        })
          .distinct('assetId')
          .exec();
      }

      totalCount = assetIds.length;

      const assets = await Assets.find({ _id: { $in: assetIds } })
        .skip(+_skip)
        .limit(+_limit)
        .lean()
        .exec();

      return res.status(200).send({
        success: true,
        data: assets,
        count: totalCount,
      });
    } else if (req.query.modelType === 'viewed') {
      let assetIds;
      if (res.locals.user.role === 'Admin') {
        assetIds = await Viewed.find({
          viewedUserId: { $ne: res.locals.user.userId },
        })
          .distinct('assetId')
          .exec();
      } else {
        assetIds = await Viewed.find({
          userId: res.locals.user.userId,
          viewedUserId: { $ne: res.locals.user.userId },
        })
          .distinct('assetId')
          .exec();
      }

      totalCount = assetIds.length;

      const assets = await Assets.find({ _id: { $in: assetIds } })
        .skip(+_skip)
        .limit(+_limit)
        .lean()
        .exec();

      return res.status(200).send({
        success: true,
        data: assets,
        count: totalCount,
      });
    }
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
