/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const DownloadedAnalysisSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  downloadedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['Project', 'Asset'],
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  assetId: {
    type: Schema.Types.ObjectId,
    ref: 'Assets',
  },
  purpose: {
    type: String,
  },
  name: {
    type: String,
  },
});
export const Downloaded = mongooseModel(
  'DownloadedAnalysis',
  DownloadedAnalysisSchema,
);
