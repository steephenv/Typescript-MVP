import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { InterviewDetails } from '../../models/InterviewDetails';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import '../../models/TimeSlots';
// import { TimeSlot } from '../../models/TimeSlots';

export const getInterviewDate: RequestHandler = async (req, res, next) => {
  try {
    const comingUserId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    let interview: any = await InterviewDetails.findOne({
      contestantId: comingUserId,
      interviewStatus: 'Applied',
    })
      .lean()
      .exec();
    if (interview) {
      const selectedSlot = await InterviewAvailabilityCalender.findOne({
        interviewId: interview._id,
      })
        .lean()
        .exec();
      interview.slot = {
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      };
      interview.slotDayStartingTime = selectedSlot.slotDayStartingTime;
    } else {
      interview = {};
    }

    return res.status(200).send({
      success: true,
      inter: interview,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
