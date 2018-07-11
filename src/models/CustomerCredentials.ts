import { model as mongooseModel, Schema } from 'mongoose';

const customerCredentialsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  consultantId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
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

export const customerCredentials = mongooseModel(
  'customerCredentials',
  customerCredentialsSchema,
);
