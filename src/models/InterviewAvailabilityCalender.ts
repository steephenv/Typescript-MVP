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
    enum: ['interview', 'project'],
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
  createdAt: {
    type: Date,
  },
});

export const InterviewAvailabilityCalender = mongooseModel(
  'InterviewAvailabilityCalender',
  InterviewAvailabilityCalenderSchema,
);
