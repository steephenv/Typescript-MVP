import { RequestHandler } from 'express';
import { AssetCategory } from '../../models/AssetCategory';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listAssetCategory: RequestHandler = async (req, res, next) => {
  try {
    const cats = await AssetCategory.find({}).exec();
    return res.status(200).send({
      success: true,
      categories: cats,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
