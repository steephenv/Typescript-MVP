import { RequestHandler } from 'express';

import { Goals } from '../../models/Goals';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveGoals: RequestHandler = async (req, res, next) => {
  try {
    let comingUserId;
    if (req.query.userId) {
      comingUserId = req.query.userId;
    } else {
      comingUserId = res.locals.user.userId;
    }
    await Goals.remove({ userId: comingUserId });
    req.body.userId = comingUserId;
    const newGoal = new Goals(req.body);
    await newGoal.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
