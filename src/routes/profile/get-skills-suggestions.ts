import { RequestHandler } from 'express';

import { Skills } from '../../models/Skills';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const skillsSuggestions: RequestHandler = async (req, res, next) => {
  try {
    const skillsData = await Skills.find({ subCategory: req.query.subCategory })
      .distinct('skillTitle')
      .exec();
    return res.status(200).send({
      success: true,
      skills: skillsData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
