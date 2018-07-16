import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { AvailabilityCalender } from '../../models/AvailabilityCalender';

export const listAvailableDates: RequestHandler = async (req, res, next) => {
  try {
    const newDate = req.query.date ? new Date(req.query.date) : new Date();
    const dates = await AvailabilityCalender.aggregate([
      {
        $match: {
          $and: [{ date: { $gt: newDate } }, { 'userId.0': { $exists: true } }],
        },
      },
      { $limit: 3 },
      { $sort: { date: -1 } },
      { $group: { _id: '$dateString', slots: { $addToSet: '$slot' } } },
      {
        $lookup: {
          from: 'timeslots',
          localField: 'slots',
          foreignField: '_id',
          as: 'slotData',
        },
      },
    ]).exec();
    return res.status(200).send({
      success: true,
      data: dates,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
