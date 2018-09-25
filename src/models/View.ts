/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores view details of assets and projects info';

export const definitions = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  viewedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['Project', 'Asset'],
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  assetId: {
    type: Schema.Types.ObjectId,
    ref: 'Assets',
  },
};

const ViewAnalysisSchema: Schema = new Schema(definitions);
export const Viewed = mongooseModel('ViewAnalysis', ViewAnalysisSchema);
