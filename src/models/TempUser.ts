/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description =
  'Stores details of user temporarily before during registration';
export const definitions = {
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  appliedRole: {
    type: String,
    enum: ['User', 'Consultant', 'BPM', 'Client', 'Admin', 'Employee'],
    required: true,
  },
  callTime: {
    type: String,
  },
  callDate: {
    type: String,
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  secondaryEmail: {
    type: String,
  },
  role: {
    type: String,
    enum: ['User', 'Consultant', 'BPM', 'Admin', 'Client', 'Employee'],
    required: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  refererId: {
    type: Schema.Types.ObjectId,
  },
  countableReferer: {
    type: Boolean,
    default: true,
  },
};
const TempUserSchema: Schema = new Schema(definitions);

export const TempUser = mongooseModel('TempUser', TempUserSchema);
