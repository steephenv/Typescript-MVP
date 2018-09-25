/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `Stores availability of users`;

export const definitions = {
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
  assigned: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
};

const AvailabilityCalenderSchema: Schema = new Schema(definitions);

export const AvailabilityCalender = mongooseModel(
  'AvailabilityCalender',
  AvailabilityCalenderSchema,
);
