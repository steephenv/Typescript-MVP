/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const projectEnvironmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  stakeHolder: {
    type: String,
  },
  businessFunction: {
    type: String,
  },
  businessFunctionRole: {
    type: String,
  },
  sponsorsPosition: {
    type: String,
  },
  managersPosition: {
    type: String,
  },
});

export const ProjectEnvironment = mongooseModel(
  'projectEnvironment',
  projectEnvironmentSchema,
);
