/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const InterviewDetailsSchema = new Schema({
  contestantId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  typeOfCall: {
    type: String,
    enum: ['Video', 'Audio'],
    required: false,
  },
  platform: String,
  platformId: String,
  startTime: { type: Date },
  endTime: { type: Date },
  interviewStatus: {
    type: String,
    enum: ['Applied', 'Completed', 'Cancelled', 'Passed', 'Failed'],
    default: 'Applied',
  },
  comment: { type: String },
  reason: { type: String },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const InterviewDetails = mongooseModel(
  'InterviewDetails',
  InterviewDetailsSchema,
);
