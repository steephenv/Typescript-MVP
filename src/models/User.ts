/* tslint:disable:variable-name */

import * as bcrypt from 'bcrypt';
import { model as mongooseModel, Schema } from 'mongoose';
import './Project';

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
  appliedRole: {
    type: String,
    enum: ['User', 'Consultant', 'BPM', 'Admin', 'Client', 'Employee'],
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
  isDirectRegistration: {
    type: Boolean,
    default: false,
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
  devices: [
    {
      deviceToken: { type: String },
      device: { type: String },
    },
  ],
  profileDataVerified: {
    type: Boolean,
    default: false,
  },
  isLinkedinProfileFetched: {
    type: Boolean,
    default: false,
  },
  interviewStatus: {
    type: String,
    enum: ['Applied', 'Completed', 'Cancelled', 'Passed', 'Failed'],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  userRating: {
    type: String,
  },
  recentlyViewed: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  welcomeTour: {
    type: Boolean,
    default: false,
  },
  personalStatus: {
    type: Boolean,
    default: false,
  },
  educationStatus: {
    type: Boolean,
    default: false,
  },
  experienceStatus: {
    type: Boolean,
    default: false,
  },
  employeeStatus: {
    type: Boolean,
    default: false,
  },
  goalsStatus: {
    type: Boolean,
    default: false,
  },
  skillsStatus: {
    type: Boolean,
    default: false,
  },
  wlbStatus: {
    type: Boolean,
    default: false,
  },
  refererId: {
    type: Schema.Types.ObjectId,
  },
  countableReferer: {
    type: Boolean,
    default: true,
  },
};

const userSchema: Schema = new Schema(definitions);

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
