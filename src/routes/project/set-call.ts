import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';
import { CallSchedule } from '../../models/CallSchedule';
import { User } from '../../models/User';

import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { EmailTemplates, sendEmail } from '../../email/send-email';

import { findCallTime } from '../utils/schedule-call/filter-by-hours';

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
      typeOfCall: req.body.typeOfCall,
      callStatus: 'scheduled',
      mobile: req.body.mobile,
      callerId: req.body.userId || res.locals.user.userId,
    });

    const savedCall: any = await callModel.save();

    await InterviewAvailabilityCalender.update(
      { _id: slot[0]._id },
      { $set: { booked: true, type: 'call', callId: savedCall._id } },
    ).exec();

    const userId = req.body.userId || res.locals.user.userId;
    const adminPromise = await User.findOne({
      role: 'Admin',
    })
      .lean()
      .exec();

    const userPromise = await User.findById({ _id: userId })
      .lean()
      .exec();

    const users = await BluePromise.all([adminPromise, userPromise]);

    const mailOptions = {
      toAddresses: [users[0].email],
      template: EmailTemplates.SET_CALL,
      fromName: 'Miwago Team',
      subject: `Set Admin Call`,
      fields: {
        user: users[1].firstName + ' ' + users[1].lastName,
        projectName: req.body.projectName || '',
        timeForCall: new Date(slot.startTime),
        mobile: users[1].mobile || '',
        otherDetails: req.body.otherDetails || '',
      },
    };
    await sendEmail(mailOptions);

    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
