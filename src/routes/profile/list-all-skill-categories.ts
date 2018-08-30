import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { SkillCategory } from '../../models/SkillCategory';
import { SkillSubCategory } from '../../models/SkillSubCategory';

export const listAllSkillCategories: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { _limit = 50, _skip = 0 } = req.query;
    delete req.query._limit;
    delete req.query._skip;

    if (isNaN(_limit) || isNaN(_skip)) {
      return new RequestError(
        RequestErrorType.UNPROCESSABLE_ENTITY,
        'limit and skip should be numbers',
      );
    }

    const givenCluster = req.query.cluster ? req.query.cluster : '';
    const catsP = SkillCategory.find({
      isDelete: false,
      cluster: givenCluster,
    })
      .limit(_limit)
      .skip(_skip)
      .lean()
      .exec();

    const countP = SkillCategory.count({
      isDelete: false,
      cluster: givenCluster,
    }).exec();

    const [cats, count] = await BluePromise.all([catsP, countP]);

    if (cats.length) {
      await BluePromise.map(cats, async (cat: any) => {
        const subCategories = await SkillSubCategory.find({
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
      .send({ success: true, skillCategories: cats, count });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
