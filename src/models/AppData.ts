/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `app-specific data. stored as key-val pair. helps server to boot`;
export const definitions = {
  name: {
    type: String,
    unique: true,
    required: true,
    comment: 'key',
  },
  content: {
    type: Schema.Types.Mixed,
    comment: 'value',
  },
};

const appDataSchema = new Schema(definitions);

export const AppData = mongooseModel('AppData', appDataSchema);
