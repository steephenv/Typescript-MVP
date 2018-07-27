import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { SkillCategory } from '../../models/SkillCategory';
import { SkillSubCategory } from '../../models/SkillSubCategory';

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.model === 'category') {
      const deleteMainCategory = SkillCategory.update(
        { _id: req.body._id },
        { $set: { isDelete: true } },
      );
      const deleteSubs = SkillSubCategory.update(
        { categoryId: req.body._id },
        { $set: { isDelete: true } },
      );

      await BluePromise.all([deleteMainCategory, deleteSubs]);
    } else {
      await SkillCategory.update(
        { _id: req.body._id },
        { $set: { isDelete: true } },
      );
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
