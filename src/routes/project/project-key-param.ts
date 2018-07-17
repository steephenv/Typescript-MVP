import { RequestHandler } from 'express';

import { ProjectKeyParameters } from '../../models/ProjectKeyParameters';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveProjectKeyParam: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};
    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    if (req.query && req.query.userId) {
      await ProjectKeyParameters.update(where, { $set: req.body });
    } else {
      req.body.createdAt = new Date();
      req.body.createdBy = res.locals.user.userId;
      const newData = new ProjectKeyParameters(req.body);
      await newData.save();
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
