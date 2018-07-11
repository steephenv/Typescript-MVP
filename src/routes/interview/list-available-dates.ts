import { RequestHandler } from 'express';

import { AvailabilityCalender } from '../../models/AvailabilityCalender';

export const listAvailableDates: RequestHandler = async (req, res) => {
  try {
    const dates = await AvailabilityCalender.aggregate([
      { $match: { date: { $gt: new Date() } } },
      { $limit: 3 },
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
    return res.status(500).send({
      success: false,
      msg: err,
    });
  }
};