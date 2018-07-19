import { splitTime } from '../../utils/time-management/split-time';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import { Promise as BluePromise } from 'bluebird';

export const saveToAvailabilityCalender = async (
  startTime: Date,
  endTime: Date,
  userId: string,
) => {
  const slots = splitTime(startTime, endTime);

  await BluePromise.map(slots, slot => {
    const startDateString = `${slot.startTime.getFullYear()}-${slot.startTime.getMonth() +
      1}-${slot.startTime.getDate()}`;
    const slotDayStarting = new Date(
      new Date(startDateString).setHours(0, 0, 0, 0),
    );
    const savableSlot = new InterviewAvailabilityCalender({
      userId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      slotDayStartingTime: slotDayStarting,
      createdAt: new Date(),
    });

    return savableSlot.save();
  });
  return;
};

export const saveAvailability: RequestHandler = async (req, res, next) => {
  const d1 = new Date('2018-07-24T09:00:00.000Z');
  const d2 = new Date('2018-07-24T18:00:00.000Z');

  try {
    await saveToAvailabilityCalender(d1, d2, '5b4ec872a460311897f866be');
    return res.status(200).send('Success');
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
