import { model as mongooseModel, Schema } from 'mongoose';

const workExperianceSchema = new Schema({
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
    enum: ['User', 'Consultant', 'MVP', 'Client', 'Employee'],
    required: true,
  },
  companyName: {
    type: String,
  },
  callTime: {
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
    enum: ['User', 'Consultant', 'MVP', 'Client', 'Employee'],
    required: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  devices: [
    {
      deviceToken: { type: String },
      device: { type: String },
    },
  ],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const workExperiance = mongooseModel(
  'workExperianceSchema',
  workExperianceSchema,
);
