import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { ProjectRequest } from '../../models/ProjectRequest';

export const saveProjectDraft: RequestHandler = async (req, res, next) => {
  try {
    const newData: any = new ProjectRequest({
      userId: res.locals.user.userId,
      projectId: req.body.projectId,
      projectName: req.body.projectName,
      templateType: req.body.templateType,
      status: req.body.status,
    });
    await newData.save();

    return res.status(201).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
