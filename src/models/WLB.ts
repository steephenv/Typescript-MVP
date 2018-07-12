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
    type: String,
  },
  frequencyHomeOfficeWork: {
    type: String,
  },
  location: [String],
  workPermit: {
    type: String,
  },
});

export const Wlb = mongooseModel('Wlb', wlbSchema);
