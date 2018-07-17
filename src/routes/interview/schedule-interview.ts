/* tslint:disable:no-var-requires */
import { RequestHandler } from 'express';

import { Interview } from '../../models/Interview';
import { AvailabilityCalender } from '../../models/AvailabilityCalender';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { messages } from '../../config/app/messages';

export const scheduleInterview: RequestHandler = async (req, res, next) => {
  try {
    const appliedRecord: any = await Interview.findOne({
      userId: res.locals.user.userId,
      status: 'Applied',
    })
      .lean()
      .exec();
    if (appliedRecord) {
      const calQuery = {
        dateString: appliedRecord.dateString,
        slot: appliedRecord.slot,
      };
      await AvailabilityCalender.update(calQuery, {
        $addToSet: { userId: appliedRecord.interviewer },
      });
      await Interview.remove({
        userId: res.locals.user.userId,
        status: 'Applied',
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

    const dateVal = new Date(req.body.dateString);
    const newInterview = new Interview({
      interviewDate: dateVal,
      typeOfCall: req.body.typeOfCall,
      slot: req.body.slot,
      dateString: req.body.dateString,
      interviewer: interViewer,
      userId: res.locals.user.userId,
    });
    await newInterview.save();

    return res.status(201).send({
      success: true,
      msg: messages.interviewScheduled.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
