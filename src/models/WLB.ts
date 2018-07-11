import { model as mongooseModel, Schema } from 'mongoose';

const wlbSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
  },
  annualAvailableCapacity: {
    type: String,
  },
  frequency: {
    type: String,
  },
  location: {
    type: [String],
  },
  workpermit: {
    type: String,
  },
});

export const wlb = mongooseModel('wlbSchema', wlbSchema);
