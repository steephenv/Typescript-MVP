import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Skills } from '../../models/Skills';
import { Goals } from '../../models/Goals';

export const deleteAdminSkills: RequestHandler = async (req, res, next) => {
  try {
    await Skills.remove({
      cluster: req.body.cluster,
      category: req.body.category,
      subCategory: req.body.subCategory,
      skillTitle: req.body.skillTitle,
    }).exec();
    const goalData = await Goals.find({
      skillTargets: { $elemMatch: { skillId: req.body.skillId } },
    })
      .distinct('_id')
      .exec();
    await Goals.updateMany(
      { _id: { $in: goalData } },
      { $pull: { skillTargets: { skillId: req.body.skillId } } },
    ).exec();
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
