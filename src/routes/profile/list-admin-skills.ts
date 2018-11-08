import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Skills } from '../../models/Skills';
import { SkillSubCategory } from '../../models/SkillSubCategory';

import '../../models/SkillCategory';

export const getAdminSkills: RequestHandler = async (req, res, next) => {
  try {
    const skillSubData = await SkillSubCategory.find({
      categoryId: req.query.categoryId,
    }).exec();

    const skillsData: any = await BluePromise.map(
      skillSubData,
      async (sub: any) => {
        return await Skills.aggregate([
          { $match: { category: sub.categoryId, subCategory: sub._id } },
          {
            $group: {
              _id: '$skillTitle',
              cluster: { $first: '$cluster' },
              category: { $first: '$category' },
              subCategory: { $first: '$subCategory' },
              skillTitle: { $first: '$skillTitle' },
            },
          },
        ]);
      },
    );
    const resultData: any = [];
    // let loopData;
    await BluePromise.map(skillsData, async (result: any) => {
      return await BluePromise.map(result, async (looped: any) => {
        const loopData = await Skills.findOne({
          cluster: looped.cluster,
          category: looped.category,
          subCategory: looped.subCategory,
          skillTitle: looped.skillTitle,
        })
          .populate('subCategory')
          .lean()
          .exec();
        resultData.push(loopData);
      });
    });
    return res.status(200).send({
      success: true,
      skills: resultData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
