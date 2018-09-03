import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';

export const suggestUsers: RequestHandler = async (req, res, next) => {
  try {
    const regexp = new RegExp(`^${req.query.text}`, 'i');
    const userSuggestion = await User.find({
      role: req.query.role,
      firstName: regexp,
    }).exec();
    return res.status(200).send({
      success: true,
      users: userSuggestion,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
