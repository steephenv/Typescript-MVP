/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores work life balance info';

export const definitions = {
  userId: {
    type: String,
    ref: 'User',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
  annualAvailableCapacity: {
    type: Number,
  },
  capricornsAvailableCapacity: {
    type: Number,
  },
  frequencyOnsiteWork: {
    type: Number,
  },
  frequencyHomeOfficeWork: {
    type: Number,
  },
  location: [
    {
      type: String,
    },
  ],
  workPermit: {
    type: String,
  },
  daysInYear: {
    type: Number,
  },
  daysInCapricornsYear: {
    type: Number,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  fileName: {
    type: String,
  },
};

const wlbSchema: Schema = new Schema(definitions);

export const Wlb = mongooseModel('Wlb', wlbSchema);
