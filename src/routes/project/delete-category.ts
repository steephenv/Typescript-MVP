import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { ProjectCategory } from '../../models/ProjectCategory';
import { ProjectSubCategory } from '../../models/ProjectSubCategory';

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    if (req.query.model === 'category') {
      const deleteMainCategory = ProjectCategory.update(
        { _id: req.query._id },
        { $set: { isDelete: true } },
      );
      const deleteSubs = ProjectSubCategory.update(
        { categoryId: req.query._id },
        { $set: { isDelete: true } },
      );

      await BluePromise.all([deleteMainCategory, deleteSubs]);
    } else {
      await ProjectSubCategory.update(
        { _id: req.query._id },
        { $set: { isDelete: true } },
      );
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
