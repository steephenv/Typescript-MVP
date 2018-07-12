import { RequestHandler } from 'express';
import { SkillCategory } from '../../models/SkillCategory';
import { SkillSubCategory } from '../../models/SkillSubCategory';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const skilldata = await BluePromise.all([
      SkillCategory.find().exec(),
      SkillSubCategory.find().exec(),
    ]);
    return res.status(200).json({
      succes: true,
      data: skilldata,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
