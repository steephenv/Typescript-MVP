/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores interview scheduling details';

export const definitions = {
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
    ref: 'TimeSlot',
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
  dateString: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'Applied',
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
};
const InterviewSchema: Schema = new Schema(definitions);

export const Interview = mongooseModel('Interview', InterviewSchema);
