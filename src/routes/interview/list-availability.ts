import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';

export const listBPMAvailability: RequestHandler = async (req, res, next) => {
  try {
    const dateInit = new Date(new Date().setDate(new Date().getDate() + 1));
    const gettingDate = req.query.date ? new Date(req.query.date) : dateInit;
    const forward = req.query.forward ? req.query.forward : 'true';
    const givenStartTime = new Date(gettingDate.setHours(23, 59, 59, 999));
    const givenEndTime = new Date(gettingDate.setHours(0, 0, 0, 0));

    let timeQuery = {};
    let sortVariable = 1;
    if (forward === 'true') {
      timeQuery = { slotDayStartingTime: { $gt: givenStartTime } };
    } else {
      sortVariable = -1;
      timeQuery = { slotDayStartingTime: { $lt: givenEndTime } };
    }

    const dates = await InterviewAvailabilityCalender.aggregate([
      {
        $match: {
          $and: [timeQuery, { booked: false }],
        },
      },
      {
        $group: {
          _id: '$slotDayStartingTime',
          slots: {
            $addToSet: {
              startTime: '$startTime',
              endTime: '$endTime',
            },
          },
        },
      },
      { $unwind: '$slots' },
      { $sort: { 'slots.startTime': 1 } },
      { $group: { _id: '$_id', slotData: { $push: '$slots' } } },
      { $sort: { _id: sortVariable } },
      { $limit: 3 },
      { $sort: { _id: 1 } },
    ]).exec();
    return res.status(200).send({ success: true, data: dates });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
