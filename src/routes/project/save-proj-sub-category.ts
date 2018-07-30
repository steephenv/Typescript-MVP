import { RequestHandler } from 'express';
import { ProjectSubCategory } from '../../models/ProjectSubCategory';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const createProjectSubCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const cat = new ProjectSubCategory(req.body);

    await cat.save();

    return res.status(201).send({
      status: 'success',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
