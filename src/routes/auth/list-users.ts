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
    const { _limit = 50, _skip = 0 } = req.query;
    delete req.query._limit;
    delete req.query._skip;

    const condition = req.query;

    const totalNumUsersPromise = User.count(condition).exec();

    const usersListPromise = User.find(condition)
      .select(
        'firstName lastName appliedRole role profileDataVerified createdAt',
      )
      .skip(+_skip)
      .limit(+_limit)
      .sort('-createdAt')
      .lean()
      .exec();
    const [totalNumUsers, usersList] = await BluePromise.all([
      totalNumUsersPromise,
      usersListPromise,
    ]);
    await BluePromise.map(usersList, async (user: any) => {
      const interviewDetails = await InterviewDetails.find({
        contestantId: user._id,
      })
        .sort('-createdAt')
        .lean()
        .exec();
      if (interviewDetails.length) {
        user.interviewDetails = interviewDetails[0];
      }
      const statusDetails = await User.find({
        _id: user._id,
      })
        .select(
          'personalStatus educationStatus experienceStatus employeeStatus goalsStatus skillsStatus wlbStatus',
        )
        .lean()
        .exec();
      if (statusDetails.length) {
        user.statusDetails = statusDetails[0];
      }
      return;
    });
    return res.status(200).send({
      success: true,
      users: usersList,
      totalUsers: totalNumUsers,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
