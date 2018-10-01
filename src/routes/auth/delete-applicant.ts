import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { InterviewDetails } from '../../models/InterviewDetails';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const deleteApplicant: RequestHandler = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.query.userId });
    const interviewData = await InterviewDetails.findOne({
      contestantId: req.query.userId,
    });
    if (interviewData) {
      await InterviewAvailabilityCalender.findOneAndUpdate(
        {
          interviewId: interviewData._id,
        },
        { $set: { booked: false, type: undefined, interviewId: undefined } },
      );
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
