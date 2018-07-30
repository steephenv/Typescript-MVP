import { RequestHandler } from 'express';
import { Project } from '../../models/Project';
import '../../models/ProjectCategory';
import '../../models/ProjectSubCategory';
import '../../models/Industries';
import '../../models/Business-function';
import '../../models/Business-sub-function';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getProjects: RequestHandler = async (req, res, next) => {
  try {
    const projectList = await Project.find({})
      .populate('category')
      .populate('subCategory')
      .populate('industryLine')
      .populate('businessFunctions')
      .populate('businessSubFunctions')
      .exec();
    return res.status(200).send({
      success: true,
      projects: projectList,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
