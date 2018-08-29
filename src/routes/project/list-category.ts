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
    const { _limit = 50, _skip = 0 } = req.query;
    delete req.query._limit;
    delete req.query._skip;

    if (isNaN(_limit) || isNaN(_skip)) {
      return next(
        new RequestError(
          RequestErrorType.UNPROCESSABLE_ENTITY,
          'limit and skip should be numbers',
        ),
      );
    }

    const catsP = ProjectCategory.find({ isDelete: false })
      .limit(_limit)
      .skip(_skip)
      .lean()
      .exec();

    const countP = ProjectCategory.count({}).exec();

    const [cats, count] = await BluePromise.all([catsP, countP]);

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
    return res
      .status(200)
      .send({ success: true, projectCategories: cats, count });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
