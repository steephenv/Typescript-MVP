/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const assetsSchema: Schema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'AssetCategory',
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'AssetSubCategory',
  },
  stage: {
    type: String,
  },
  type: {
    type: String,
  },
  industryId: {
    type: Schema.Types.ObjectId,
    ref: 'Industry',
  },
  businessFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
  },
  businessSubFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessSubFunction',
  },
  imageAccessUrl: {
    type: String,
  },

  fileAccessUrls: [
    {
      type: String,
    },
  ],
  technologyPlatform: {
    type: String,
  },
  fileName: {
    type: String,
  },
  lang: {
    type: String,
  },
  format: {
    type: String,
  },
  size: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Assets = mongooseModel('Assets', assetsSchema);
