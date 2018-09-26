import { splitTime } from '../../utils/time-management/split-time';
import { getWorkingPeriods } from '../../utils/time-management/get-working-periods';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import { Promise as BluePromise } from 'bluebird';

export const saveAvailability: RequestHandler = async (req, res, next) => {
  try {
    const d1 = new Date(req.body.dateRange.startDate);
    const d2 = new Date(req.body.dateRange.endDate);
    const savingUserId = req.body.userId
      ? req.body.userId
      : res.locals.user.userId;

    const availableDays = splitTime(d1, d2, 86400000);

    const periodsArray = getWorkingPeriods(
      availableDays,
      req.body.workingDays,
      req.body.workingTimeNumber,
      req.body.breakTimeNumber,
      req.body.timezone,
    );

    const slotsArray = periodsArray.map(period => {
      return splitTime(period.startTime, period.endTime, 60 * 60 * 1000);
    });

    const flattened = [].concat(...slotsArray);

    await BluePromise.map(flattened, slot => {
      const startDateString = `${slot.startTime.getFullYear()}-${slot.startTime.getMonth() +
        1}-${slot.startTime.getDate()}`;
      const slotDayStarting = new Date(
        new Date(startDateString).setUTCHours(0, 0, 0, 0),
      );
      const savableSlot = new InterviewAvailabilityCalender({
        userId: savingUserId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        slotDayStartingTime: slotDayStarting,
        createdAt: new Date(),
        annualAvailability: req.body.annualAvailability,
      });

      return savableSlot.save();
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
