/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description =
  'Stores details time slot details used for interview';

export const definitions = {
  title: {
    type: String,
  },
  timePeriod: {
    type: String,
  },
};

const TimeSlotSchema: Schema = new Schema(definitions);

export const TimeSlot = mongooseModel('TimeSlot', TimeSlotSchema);
