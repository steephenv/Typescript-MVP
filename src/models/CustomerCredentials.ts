/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const customerCredentialsSchema = new Schema({
  name: {
    type: String,
  },
  consultantId: {
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
});

export const CustomerCredentials = mongooseModel(
  'CustomerCredentials',
  customerCredentialsSchema,
);
