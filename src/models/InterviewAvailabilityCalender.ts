/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details interview availability info';

export const definitions = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  slotDayStartingTime: {
    type: Date,
    required: true,
  },
  annualAvailability: {
    type: Number,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['interview', 'project', 'call'],
  },
  booked: {
    type: Boolean,
    default: false,
  },
  interviewId: {
    type: Schema.Types.ObjectId,
    ref: 'InterviewDetails',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectRequest',
  },
  callId: {
    type: Schema.Types.ObjectId,
    ref: 'CallSchedule',
  },
  createdAt: {
    type: Date,
  },
};
const InterviewAvailabilityCalenderSchema: Schema = new Schema(definitions);

export const InterviewAvailabilityCalender = mongooseModel(
  'InterviewAvailabilityCalender',
  InterviewAvailabilityCalenderSchema,
);
