/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of user info';

export const definitions = {
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  message: {
    type: String,
  },
};

const getInTouchDataSchema: Schema = new Schema(definitions);

export const getInTouchData = mongooseModel(
  'getInTouchData',
  getInTouchDataSchema,
);
