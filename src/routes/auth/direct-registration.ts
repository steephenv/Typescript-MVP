import { Promise as BluePromise } from 'bluebird';
import { RequestHandler } from 'express';

import { TempUser } from '../../models/TempUser';
import { CallSchedule } from '../../models/CallSchedule';
import { User } from '../../models/User';
import { InterviewAvailabilityCalender } from '../../models/InterviewAvailabilityCalender';

import { EmailTemplates, sendEmail } from '../../email/send-email';
import { messages } from '../../config/app/messages';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const directRegistration: RequestHandler = async (req, res, next) => {
  try {
    const [user, temp] = await BluePromise.all([
      User.findOne({ email: req.body.email }).exec(),
      TempUser.findOne({ email: req.body.email }).exec(),
    ]);
    if (user || temp) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.emailExisting.ENG),
      );
    }

    req.body.role = 'User';
    if (req.body.appliedRole === 'Client') {
      req.body.role = 'Client';
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new RequestError(
          RequestErrorType.BAD_REQUEST,
          messages.passwordMismatch,
        ),
      );
    }
    // const verificationUrl = req.body.url.replace(/{token}/g, token);
    const newUser: any = new User(req.body);
    const savedUser = await newUser.save();

    if (req.body.isAssisted) {
      const query = {
        startTime: { $gte: new Date(req.body.callStartTime) },
        endTime: { $lte: new Date(req.body.callEndTime) },
        booked: false,
      };
      const slot: any = await InterviewAvailabilityCalender.find(query)
        .sort('startTime')
        .exec();

      if (!slot || !slot.length) {
        await User.remove({ _id: savedUser._id }).exec();
        return next(
          new RequestError(
            RequestErrorType.BAD_REQUEST,
            messages.NoInterviewer,
          ),
        );
      }
      const callModel = new CallSchedule({
        createdAt: new Date(),
        calleeId: slot[0].userId,
        callStartTime: slot.startTime,
        callEndTime: slot.endTime,
        typeOfCall: 'registration',
        callStatus: 'scheduled',
        mobile: req.body.mobile,
        callerId: savedUser._id,
      });

      const savedCall: any = await callModel.save();
      await InterviewAvailabilityCalender.update(
        { _id: slot[0]._id },
        { $set: { booked: true, type: 'call', callId: savedCall._id } },
      ).exec();

      const userId = savedUser._id;
      const adminPromise = await User.findOne({
        _id: slot[0].userId,
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
        fromName: 'Capricorns Team',
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
    }
    return res.status(201).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
