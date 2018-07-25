/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const TempUserSchema: Schema = new Schema({
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
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

export const TempUser = mongooseModel('TempUser', TempUserSchema);
