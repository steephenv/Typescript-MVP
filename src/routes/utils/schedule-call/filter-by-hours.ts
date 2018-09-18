import { InterviewAvailabilityCalender } from '../../../models/InterviewAvailabilityCalender';

export const findCallTime = async (
  startTime: Date,
  endTime: Date,
  hourArray: number[],
  offset: string,
) => {
  const newEnd = new Date(endTime);
  const availabilities = await InterviewAvailabilityCalender.aggregate([
    { $match: { $and: [{ startTime: { $gt: newEnd } }, { booked: false }] } },
    {
      $project: {
        startTime: '$startTime',
        endTime: '$endTime',
        userId: '$userId',
        hour: { $hour: { date: '$startTime', timezone: offset } },
      },
    },
    { $match: { hour: { $in: hourArray } } },
    { $sort: { hour: 1 } },
  ]).exec();
  if (!availabilities.length) {
    return { success: false };
  } else {
    return { success: true, slot: availabilities[0] };
  }
};
