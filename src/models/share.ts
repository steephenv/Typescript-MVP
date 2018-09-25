/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of shared assets and projects info';
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
  sharedLink: [
    {
      type: String,
    },
  ],
  sharedTo: {
    type: String,
  },
};
const ShareSchema: Schema = new Schema(definitions);

export const Share = mongooseModel('Share', ShareSchema);
