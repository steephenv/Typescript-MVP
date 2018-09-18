import { InterviewAvailabilityCalender } from '../../../models/InterviewAvailabilityCalender';
import { CallSchedule } from '../../../models/CallSchedule';

import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';

import { findCallTime } from './filter-by-hours';

export const scheduleCall: RequestHandler = async (req, res, next) => {
  let query: any = {};
  try {
    if (req.body.typeOfCall === 'project') {
      const getCallTime: any = await findCallTime(
        req.body.startTime,
        req.body.endTime,
        req.body.hoursArray,
        req.body.offset,
      );
      if (!getCallTime.success) {
        return res.status(400).send({
          success: false,
          msg: 'No Availability',
        });
      } else {
        delete getCallTime.slot.hour;
        query = getCallTime.slot;
        query.booked = false;
      }
    } else {
      query = {
        startTime: { $gte: new Date(req.body.startTime) },
        endTime: { $lte: new Date(req.body.endTime) },
        booked: false,
      };
    }

    const slot: any = await InterviewAvailabilityCalender.find(query)
      .sort('startTime')
      .exec();

    if (!slot || !slot.length) {
      return res.status(400).send({
        success: false,
        msg: 'No Availability',
      });
    }

    const callModel = new CallSchedule({
      createdAt: new Date(),
      calleeId: slot[0].userId,
      callStartTime: slot.startTime,
      callEndTime: slot.endTime,
      typeOfCall: req.body.startTime,
      callStatus: 'scheduled',
      callerId: req.body.userId || res.locals.userId,
    });

    const savedCall: any = await callModel.save();

    await InterviewAvailabilityCalender.update(
      { _id: slot[0]._id },
      { $set: { booked: true, type: 'call', callId: savedCall._id } },
    ).exec();

    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
