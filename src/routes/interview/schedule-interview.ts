/* tslint:disable:no-var-requires */
import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';

import { Interview } from '../../models/Interview';
import { AvailabilityCalender } from '../../models/AvailabilityCalender';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { messages } from '../../config/app/messages';

export const scheduleInterview: RequestHandler = async (req, res, next) => {
  try {
    const appliedCount = await Interview.count({
      userId: res.locals.user.userId,
    });
    if (appliedCount > 0) {
      return res.status(409).send({
        success: false,
        msg: messages.interviewConflict.ENG,
      });
    }
    const query = { dateString: req.body.dateString, slot: req.body.slot };
    const freePersons: any = await AvailabilityCalender.findOne(query).exec();
    if (!freePersons || freePersons.userId.length === 0) {
      return res.status(401).send({
        success: false,
        msg: messages.NoInterviewer.ENG,
      });
    }
    const interViewer = freePersons.userId[0];
    freePersons.userId.shift();
    freePersons.assigned.push(interViewer);
    await freePersons.save();
    await Interview.update(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      {
        interviewDate: new Date(req.body.dateString),
        typeOfCall: req.body.typeOfCall,
        slot: req.body.slot,
        interviewer: interViewer,
        userId: res.locals.user.userId,
      },
      { upsert: true },
    );

    return res.status(201).send({
      success: true,
      msg: messages.interviewScheduled.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
