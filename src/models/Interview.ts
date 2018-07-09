/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const InterviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  interviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'TimeSlots',
  },
  typeOfCall: {
    type: String,
    enum: ['Video', 'Audio'],
    required: false,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  assessmentDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const Interview = mongooseModel('Interview', InterviewSchema);
