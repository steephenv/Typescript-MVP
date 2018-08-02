import { RequestHandler } from 'express';

import { Project } from '../../models/Project';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveProject: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    req.body.createdAt = new Date();
    const projectData = new Project(req.body);
    await projectData.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

export const updateProject: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    req.body.createdAt = new Date();
    await Project.findOneAndUpdate({ _id: req.body.projectId }, req.body);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
