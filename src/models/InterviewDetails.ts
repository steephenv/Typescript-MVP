/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores interview details info';

export const definitions = {
  contestantId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  typeOfCall: {
    type: String,
    enum: ['Video', 'Audio'],
    required: false,
  },
  platform: { type: String },
  platformId: { type: String },
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
};
const InterviewDetailsSchema: Schema = new Schema(definitions);

export const InterviewDetails = mongooseModel(
  'InterviewDetails',
  InterviewDetailsSchema,
);
