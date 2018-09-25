/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `stores call-schedule`;
export const definitions = {
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
    enum: ['registration', 'project', 'assistance'],
  },
  projectName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  otherDetails: {
    type: String,
  },
  callStatus: {
    type: String,
    enum: ['scheduled', 'finished'],
    comment: 'either `scheduled` or `finished`',
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
};

const callScheduleSchema: Schema = new Schema(definitions);
export const CallSchedule = mongooseModel('CallSchedule', callScheduleSchema);
