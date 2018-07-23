import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';

export const listBPMAvailability: RequestHandler = async (req, res, next) => {
  try {
    const gettingDate = req.query.date ? new Date(req.query.date) : new Date();
    const givenStartTime = new Date(gettingDate.setHours(23, 59, 59, 999));
    const dates = await InterviewAvailabilityCalender.aggregate([
      {
        $match: {
          $and: [
            { slotDayStartingTime: { $gt: givenStartTime } },
            { booked: false },
          ],
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
      { $sort: { _id: 1 } },
    ]).exec();
    return res.status(200).send({ success: true, data: dates });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
