import { RequestHandler } from 'express';

import { Project } from '../../models/Project';
import '../../models/ProjectSubCategory';
import '../../models/Industries';
import '../../models/Business-function';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const searchCatalog: RequestHandler = async (req, res, next) => {
  try {
    const projectList = await Project.find({})
      .populate('category')
      .populate('subcategory')
      .populate('industryLine')
      .populate('businessFunctions')
      .exec();
    return res.status(200).send({
      success: true,
      projects: projectList,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
