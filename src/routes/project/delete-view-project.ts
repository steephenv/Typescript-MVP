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

export const getProjectById: RequestHandler = async (req, res, next) => {
  try {
    const project = await Project.findById({ _id: req.query.projectId })
      .populate('category')
      .populate('subCategory')
      .populate('industryLine')
      .populate('businessFunctions')
      .populate('businessSubFunctions')
      .lean()
      .exec();
    return res.status(200).send({
      success: true,
      projectDetails: project,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

export const deleteProjectById: RequestHandler = async (req, res, next) => {
  try {
    await Project.findByIdAndRemove({
      _id: req.query.projectId,
    }).exec();
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
