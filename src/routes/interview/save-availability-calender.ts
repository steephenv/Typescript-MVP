import { splitTime } from '../../utils/time-management/split-time';
import { getWorkingPeriods } from '../../utils/time-management/get-working-periods';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import { Promise as BluePromise } from 'bluebird';

// export const saveToAvailabilityCalender = async (
//   startTime: Date,
//   endTime: Date,
//   userId: string,
// ) => {
//   const slots = splitTime(startTime, endTime, 60 * 60 * 1000);

//   await BluePromise.map(slots, slot => {
//     const startDateString = `${slot.startTime.getFullYear()}-${slot.startTime.getMonth() +
//       1}-${slot.startTime.getDate()}`;
//     const slotDayStarting = new Date(
//       new Date(startDateString).setHours(0, 0, 0, 0),
//     );
//     const savableSlot = new InterviewAvailabilityCalender({
//       userId,
//       startTime: slot.startTime,
//       endTime: slot.endTime,
//       slotDayStartingTime: slotDayStarting,
//       createdAt: new Date(),
//     });

//     return savableSlot.save();
//   });
//   return;
// };

export const saveAvailability: RequestHandler = async (req, res, next) => {
  try {
    const d1 = new Date(req.body.dateRange.startDate).setHours(0, 0, 0, 0);
    const d2 = new Date(req.body.dateRange.endDate).setHours(23, 59, 59, 999);

    const startingDate = new Date(d1);
    const endingDate = new Date(d2);
    const availableDays = splitTime(startingDate, endingDate, 86400000);
    const periodsArray = getWorkingPeriods(
      availableDays,
      req.body.workingDays,
      req.body.workingTime,
      req.body.breakTime,
    );

    const slotsArray = periodsArray.map(period => {
      return splitTime(period.startTime, period.endTime, 60 * 60 * 1000);
    });
    const slots = slotsArray.map(newSlot => {
      return newSlot[0];
    });

    await BluePromise.map(slots, slot => {
      const startDateString = `${slot.startTime.getFullYear()}-${slot.startTime.getMonth() +
        1}-${slot.startTime.getDate()}`;
      const slotDayStarting = new Date(
        new Date(startDateString).setHours(0, 0, 0, 0),
      );
      const savableSlot = new InterviewAvailabilityCalender({
        userId: req.body.userId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        slotDayStartingTime: slotDayStarting,
        createdAt: new Date(),
      });

      return savableSlot.save();
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
