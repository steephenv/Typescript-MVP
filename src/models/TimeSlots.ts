/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const TimeSlotSchema: Schema = new Schema({
  title: {
    type: String,
  },
  timePeriod: {
    type: 'String',
  },
});

export const TimeSlot = mongooseModel('TimeSlot', TimeSlotSchema);
