import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { messages } from '../../config/app/messages';

import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import { InterviewDetails } from '../../models/InterviewDetails';

export const scheduleInterview: RequestHandler = async (req, res, next) => {
  const givenStartTime = new Date(req.body.startTime);
  const givenEndTime = new Date(req.body.endTime);
  const contestant = req.body.userId ? req.body.userId : res.locals.user.userId;

  try {
    const existingInterview: any = await InterviewDetails.findOne({
      contestId: contestant,
      interviewStatus: 'Applied',
    }).exec();

    if (existingInterview) {
      const updateCalender = InterviewAvailabilityCalender.update(
        {
          interviewId: existingInterview._id,
        },
        { $set: { booked: false, interviewId: null } },
      );

      existingInterview.interviewStatus = 'Cancelled';
      const updateExistingInterview = existingInterview.save();

      await BluePromise.all([updateCalender, updateExistingInterview]);
    }

    const availableSlot: any = await InterviewAvailabilityCalender.findOne({
      startTime: givenStartTime,
      endTime: givenEndTime,
      booked: false,
    }).exec();

    if (!availableSlot) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.NoInterviewer),
      );
    }

    const newInterview = new InterviewDetails({
      contestId: contestant,
      typeOfCall: req.body.typeOfCall,
      interviewStatus: 'Applied',
    });
    const savedInterview = await newInterview.save();

    availableSlot.booked = true;
    availableSlot.interviewId = savedInterview._id;
    await availableSlot.save();

    return res.status(201).send({
      success: true,
      msg: messages.interviewScheduled.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
