import { Promise as BluePromise } from 'bluebird';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';
import { InterviewDetails } from '../../models/InterviewDetails';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';

export const queryUsers = async (
  condition: any,
  limit: string,
  skip: string,
) => {
  // const { _limit = 50, _skip = 0 } = condition;
  // delete req.query._limit;
  // delete req.query._skip;
  const totalNumUsersPromise = User.count(condition).exec();

  const usersListPromise = User.find(condition)
    .select('firstName lastName appliedRole role profileDataVerified createdAt')
    .skip(+skip)
    .limit(+limit)
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
        'firstName lastName appliedRole role profileDataVerified createdAt mobile companyName',
      )
      .lean()
      .exec();
    if (statusDetails.length) {
      user.statusDetails = statusDetails[0];
    }
    return;
  });

  return [totalNumUsers, usersList];
};
export const listUsers: RequestHandler = async (req, res, next) => {
  try {
    let condition = {};
    const limit = req.query._limit || 10;
    const skip = req.query._skip || 0;

    delete req.query._limit;
    delete req.query._skip;

    if (req.query.type !== 'Applicant') {
      condition = req.query;
    } else {
      const user = req.body.user || res.locals.user.userId;

      const interviews = await InterviewAvailabilityCalender.find({
        booked: true,
        userId: user,
        type: 'interview',
      })
        .distinct('interviewId')
        .exec();

      const users = await InterviewDetails.find({
        _id: { $in: interviews },
        interviewStatus: 'Applied',
      })
        .distinct('contestantId')
        .exec();

      condition = { _id: { $in: users }, profileDataVerified: true };
    }

    const [totalNumUsers, usersList] = await queryUsers(condition, limit, skip);
    return res.status(200).send({
      success: true,
      users: usersList,
      totalUsers: totalNumUsers,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
