/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const appDataSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  content: Schema.Types.Mixed,
});

export const AppData = mongooseModel('AppData', appDataSchema);
