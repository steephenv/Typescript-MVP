/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export interface IAssets {
  name: string;
  category: string;
  attributes: string;
  coAuthoring: string;
  url: string;
  userId: string;
  fileName: string;
  fileType: string;
}

const assetsSchema: Schema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  attributes: {
    type: String,
  },
  coAuthoring: {
    type: String,
  },
  accessUrl: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileType: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Assets = mongooseModel('Assets', assetsSchema);
