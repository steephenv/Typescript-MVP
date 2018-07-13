/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const wlbSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
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
});

export const Wlb = mongooseModel('Wlb', wlbSchema);
