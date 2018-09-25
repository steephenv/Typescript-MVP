/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';
// import { date } from 'joi';

export const description = 'stores draft info';
export const definitions = {
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
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
};

const draftSchema = new Schema(definitions);

export const Draft = mongooseModel('Draft', draftSchema);
