/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `Queue of background tasks for worker`;

export const definitions = {
  machineId: {
    type: String,
  },
  functionName: {
    type: String,
  },
  file: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
};

const BackgroundTaskQueueSchema: Schema = new Schema(definitions);

export const BackgroundTaskQueue = mongooseModel(
  'BackgroundTaskQueue',
  BackgroundTaskQueueSchema,
);
