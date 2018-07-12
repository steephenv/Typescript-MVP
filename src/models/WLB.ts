import { model as mongooseModel, Schema } from 'mongoose';

const wlbSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
  },
  annualAvailableCapacity: {
    type: String,
  },
  capriconsAvailableCapacity: {
    type: String,
  },
  frequencyOnsiteWork: {
    type: String,
  },
  frequencyHomeOfficeWork: {
    type: String,
  },
  location: [String],
  workpermit: {
    type: String,
  },
});

export const wlb = mongooseModel('wlbSchema', wlbSchema);
