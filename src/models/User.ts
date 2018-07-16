/* tslint:disable:variable-name */

import * as bcrypt from 'bcrypt';
import { model as mongooseModel, Schema } from 'mongoose';

const userSchema = new Schema({
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
    enum: ['User', 'Consultant', 'BPM', 'Client', 'Employee'],
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
    enum: ['User', 'Consultant', 'BPM', 'Client', 'Employee'],
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

// type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user: any = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongooseModel('User', userSchema);
