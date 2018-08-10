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
    if (req.body._id) {
      const referId = req.body._id;
      delete req.body._id;
      await Goals.update({ _id: referId }, { $set: req.body }).exec();
    } else {
      const userGoal = await Goals.count({ userId: comingUserId }).exec();
      if (userGoal) {
        return next(new RequestError(RequestErrorType.CONFLICT, 'Goal Exists'));
      }
      req.body.userId = comingUserId;
      const newGoal: any = new Goals(req.body);
      newGoal.createdAt = new Date();
      newGoal.createdBy = res.locals.user.userId;
      newGoal.submitted = true;
      await newGoal.save();
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
