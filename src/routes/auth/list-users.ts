import { Promise as BluePromise } from 'bluebird';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';
import { InterviewDetails } from '../../models/InterviewDetails';

export const listUsers: RequestHandler = async (req, res, next) => {
  try {
    const usersList = await User.find({
      [res.locals.query.field]: { $in: res.locals.query.values },
    })
      .select('firstName lastName appliedRole role profileDataVerified')
      .lean()
      .exec();
    if (!usersList.length) {
      return res.status(200).send({
        success: true,
        users: [],
      });
    }
    await BluePromise.map(usersList, async (user: any) => {
      const interviewDetails = await InterviewDetails.find({
        contestId: user._id,
      })
        .sort('-createdAt')
        .lean()
        .exec();
      if (interviewDetails.length) {
        user.interviewDetails = interviewDetails[0];
      }
      return;
    });
    return res.status(200).send({
      success: true,
      users: usersList,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
