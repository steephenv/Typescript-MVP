/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const InterviewAvailabilityCalenderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  slotDayStartingTime: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  interviewId: {
    type: Schema.Types.ObjectId,
    ref: 'InterviewDetails',
  },
  createdAt: {
    type: Date,
  },
});

export const InterviewAvailabilityCalender = mongooseModel(
  'InterviewAvailabilityCalender',
  InterviewAvailabilityCalenderSchema,
);
