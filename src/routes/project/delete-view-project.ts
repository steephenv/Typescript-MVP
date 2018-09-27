import { RequestHandler } from 'express';
import { Project } from '../../models/Project';
import { Promise as BluePromise } from 'bluebird';

import '../../models/ProjectCategory';
import '../../models/ProjectSubCategory';
import '../../models/Industries';
import '../../models/Business-function';
import '../../models/Business-sub-function';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Favorites } from '../../models/Favorites';
// import { ProjectRequest } from '../../models/ProjectRequest';

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
    // const isExists = await ProjectRequest.count({
    //   projectId: req.query.projectId,
    // });
    // if (isExists !== 0) {
    //   return res.status(409).send({
    //     success: false,
    //     msg: 'Project is actively used by a client',
    //   });
    // }
    const projectPromise = Project.findByIdAndUpdate(
      { _id: req.query.projectId },
      { $set: { isDelete: true } },
    );
    const favoritePromise = Favorites.remove({
      projectsId: req.query.projectId,
    });
    await BluePromise.all([projectPromise, favoritePromise]);
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
