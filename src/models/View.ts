/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const ViewAnalysisSchema: Schema = new Schema({
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
});
export const Viewed = mongooseModel('ViewAnalysis', ViewAnalysisSchema);
