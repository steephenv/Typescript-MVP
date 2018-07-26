import { RequestHandler } from 'express';
import { AssetSubCategory } from '../../models/Asset-sub-category';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const createAssetSubCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const cat = new AssetSubCategory(req.body);

    await cat.save();

    return res.status(201).send({
      status: 'success',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
