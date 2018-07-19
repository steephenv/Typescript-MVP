import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';
export const saveReviewStatus: RequestHandler = async (req, res, next) => {
  try {
    await User.update(
      { _id: res.locals.user.userId },
      { $set: { profileDataVerified: true } },
    );
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
