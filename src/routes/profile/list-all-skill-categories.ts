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
    const givenCluster = req.query.cluster ? req.query.cluster : '';
    const cats = await SkillCategory.find({
      isDelete: false,
      cluster: givenCluster,
    })
      .lean()
      .exec();
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
    return res.status(200).send({ success: true, skillCategories: cats });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
