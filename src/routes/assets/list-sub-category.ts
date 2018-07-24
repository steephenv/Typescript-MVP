import { RequestHandler } from 'express';
import { AssetSubCategory } from '../../models/Asset-sub-category';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listAssetSubCategory: RequestHandler = async (req, res, next) => {
  try {
    const subCats = await AssetSubCategory.find(req.query).exec();

    return res.status(200).send({
      success: true,
      categories: subCats,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
