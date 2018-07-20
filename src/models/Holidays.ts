/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const HolidaySchema: Schema = new Schema({
  startTime: Date,
  endTime: Date,
});

export const Holiday = mongooseModel('Holiday', HolidaySchema);
