/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const AvailabilityCalenderSchema: Schema = new Schema({
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  dateString: {
    type: String,
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'TimeSlot',
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const AvailabilityCalender = mongooseModel(
  'AvailabilityCalender',
  AvailabilityCalenderSchema,
);
