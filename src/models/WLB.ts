/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const wlbSchema = new Schema({
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
    type: String,
  },
  capricornsAvailableCapacity: {
    type: String,
  },
  frequencyOnsiteWork: {
    type: Number,
  },
  frequencyHomeOfficeWork: {
    type: Number,
  },
  location: [String],
  workPermit: {
    type: String,
  },
  daysInYear: {
    type: Number,
  },
  daysInCapricornsYear: {
    type: Number,
  },
});

export const Wlb = mongooseModel('Wlb', wlbSchema);
