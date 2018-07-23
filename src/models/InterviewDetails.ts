/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const InterviewDetailsSchema = new Schema({
  contestId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  typeOfCall: {
    type: String,
    enum: ['Video', 'Audio'],
    required: false,
  },
  startTime: { type: Date },
  endTime: { type: Date },
  interviewStatus: {
    type: String,
    enum: ['Applied', 'Cancelled', 'Passed', 'Failed'],
    default: 'Applied',
  },
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
