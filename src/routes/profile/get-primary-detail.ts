import { RequestHandler } from 'express';
// import { Promise as BluePromise } from 'bluebird';

import { User } from '../../models/User';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getPrimaryUserData: RequestHandler = async (req, res, next) => {
  try {
    const comingUserId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    const userData = await User.findOne({
      userId: comingUserId,
    }).exec();

    res.status(200).json({
      userDetails: userData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
