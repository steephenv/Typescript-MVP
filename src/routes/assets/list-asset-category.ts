import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { AssetCategory } from '../../models/AssetCategory';
import { AssetSubCategory } from '../../models/Asset-sub-category';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const listAssetCategory: RequestHandler = async (req, res, next) => {
  try {
    const cats: Array<{
      _id: string;
      name: string;
      subCategories?: any[];
    }> = await AssetCategory.find({})
      .lean()
      .exec();

    const subCats = await BluePromise.map(cats, cat =>
      AssetSubCategory.find({ categoryId: cat._id })
        .lean()
        .exec(),
    );

    cats.forEach((cat, i) => (cat.subCategories = subCats[i]));

    return res.status(200).send({
      success: true,
      categories: cats,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
