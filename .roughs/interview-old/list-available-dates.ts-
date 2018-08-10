import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { AvailabilityCalender } from '../../models/AvailabilityCalender';

export const listAvailableDates: RequestHandler = async (req, res, next) => {
  try {
    const newDate = req.query.date ? new Date(req.query.date) : new Date();
    newDate.setHours(23, 59, 59, 999);
    const dates = await AvailabilityCalender.aggregate([
      {
        $match: {
          $and: [{ date: { $gt: newDate } }, { 'userId.0': { $exists: true } }],
        },
      },
      {
        $group: {
          _id: '$dateString',
          Date: { $first: '$date' },
          slots: { $addToSet: '$slot' },
        },
      },
      { $sort: { Date: 1 } },
      { $limit: 3 },
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
