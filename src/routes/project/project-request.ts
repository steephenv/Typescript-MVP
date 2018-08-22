import { ProjectRequest } from '../../models/ProjectRequest';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveProjectRequest: RequestHandler = async (req, res, next) => {
  try {
    req.body.userId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.status = 'Request';
    await ProjectRequest.update({ _id: req.body._id }, { $set: req.body });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
