/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'stores download info';
export const definitions = {
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
};

const DownloadedAnalysisSchema: Schema = new Schema(definitions);

export const Downloaded = mongooseModel(
  'DownloadedAnalysis',
  DownloadedAnalysisSchema,
);
