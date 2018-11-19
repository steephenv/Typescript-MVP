/* tslint:disable:variable-name */

import * as bcrypt from 'bcrypt';
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
    required: true,
    unique: true,
  },
  password: {
    type: String,
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
