import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { ProjectCategory } from '../../models/ProjectCategory';
import { ProjectSubCategory } from '../../models/ProjectSubCategory';

export const listProjectCategories: RequestHandler = async (req, res, next) => {
  try {
    const cats = await ProjectCategory.find({ isDelete: false })
      .lean()
      .exec();
    if (cats.length) {
      await BluePromise.map(cats, async (cat: any) => {
        const subCategories = await ProjectSubCategory.find({
          categoryId: cat._id,
          isDelete: false,
        })
          .lean()
          .exec();
        cat.subCategories = subCategories;
      });
    }
    return res.status(200).send({ success: true, projectCategories: cats });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
