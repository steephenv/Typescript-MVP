import { RequestHandler } from 'express';
import { ProjectCategory } from '../../models/ProjectCategory';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const createProjectCategory: RequestHandler = async (req, res, next) => {
  try {
    const cat = new ProjectCategory(req.body);

    await cat.save();

    return res.status(201).send({
      status: 'success',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
