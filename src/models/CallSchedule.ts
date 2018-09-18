/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const callScheduleSchema: Schema = new Schema({
  createdAt: {
    type: Date,
  },
  callStartTime: {
    type: Date,
  },
  callEndTime: {
    type: Date,
  },
  typeOfCall: {
    type: String,
    enum: ['register', 'project'],
  },
  callStatus: {
    type: String,
    enum: ['scheduled', 'finished'],
  },
  callerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  calleeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
export const CallSchedule = mongooseModel('CallSchedule', callScheduleSchema);
