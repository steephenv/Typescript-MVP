/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of reset password info';

export const definitions = {
  email: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  used: {
    type: Boolean,
    default: false,
  },
};
const ResetPasswordSchema: Schema = new Schema(definitions);
export const ResetPassword = mongooseModel(
  'ResetPassword',
  ResetPasswordSchema,
);
