import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Experience } from '../../models/Experience';
import { EmployeeProjects } from '../../models/EmployeeProjects';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveExperience: RequestHandler = async (req, res, next) => {
  try {
    // first delete experience, then re-create it.
    let removeUserId: string;
    if (req.query && req.query.userId) {
      removeUserId = req.query.userId;
    } else {
      removeUserId = res.locals.user.userId;
    }
    await Experience.remove({ userId: removeUserId });
    await EmployeeProjects.remove({ userId: removeUserId });
    await BluePromise.map(req.body.experiences, async (exp: any) => {
      exp.userId = removeUserId;
      exp.createdAt = new Date();
      exp.createdBy = res.locals.user.userId;
      const newData = new Experience(exp);
      await newData.save();
      return;
    });
    await BluePromise.map(req.body.projects, async (project: any) => {
      project.userId = removeUserId;
      project.createdAt = new Date();
      project.createdBy = res.locals.user.userId;
      const newData = new EmployeeProjects(project);
      await newData.save();
      return;
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
