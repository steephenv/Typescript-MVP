/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const definitions = {
  startTime: { type: Date },
  endTime: { type: Date },
};

const HolidaySchema: Schema = new Schema(definitions);

export const Holiday = mongooseModel('Holiday', HolidaySchema);
