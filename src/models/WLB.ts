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
  submitted: {
    type: Boolean,
    default: false,
  },
});

export const Wlb = mongooseModel('Wlb', wlbSchema);
