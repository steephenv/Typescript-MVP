import { RequestHandler } from 'express';
import { ProjectCategory } from '../../models/ProjectCategory';
import { ProjectSubCategory } from '../../models/ProjectSubCategory';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getProjectCategory: RequestHandler = async (req, res, next) => {
  try {
    const cats = await ProjectCategory.find({}).exec();
    return res.status(200).send({
      success: true,
      categories: cats,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

export const getProjSubCategory: RequestHandler = async (req, res, next) => {
  try {
    const subCats = await ProjectSubCategory.find({
      categoryId: req.query.category,
    }).exec();
    return res.status(200).send({
      success: true,
      subCategories: subCats,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
