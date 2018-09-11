/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const ShareSchema = new Schema({
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
  type: {
    type: String,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  assetId: {
    type: Schema.Types.ObjectId,
    ref: 'Assets',
  },
  sharedLink: {
    type: [String],
  },
  sharedTo: {
    type: String,
  },
});

export const Share = mongooseModel('Share', ShareSchema);
