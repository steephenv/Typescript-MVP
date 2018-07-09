/* tslint:disable:no-var-requires */
import { RequestHandler } from 'express';
const mongoose = require('mongoose');

import { Interview } from '../../models/Interview';
import { AvailabilityCalender } from '../../models/AvailabilityCalender';

import * as messages from '../../../config/messages.json';

export const scheduleInterview: RequestHandler = async (req, res) => {
  try {
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
        userId: res.locals.decoded.userId,
      },
      { upsert: true },
    );

    return res.status(201).send({
      success: true,
      msg: messages.interviewScheduled.ENG,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      msg: err,
    });
  }
};
