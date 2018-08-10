/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';
// import { date } from 'joi';

const draftSchema = new Schema({
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
});

export const Draft = mongooseModel('Draft', draftSchema);
