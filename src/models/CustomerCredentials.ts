/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'stores cust. credentials';
export const definitions = {
  name: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  address: {
    type: String,
  },
  credentials: {
    type: String,
  },
  relationshipLevel: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
};
const customerCredentialsSchema = new Schema(definitions);

export const CustomerCredentials = mongooseModel(
  'CustomerCredentials',
  customerCredentialsSchema,
);
