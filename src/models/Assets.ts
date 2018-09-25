/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores assets info';

export const definitions = {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'AssetCategory',
    comment: 'taken from `AssetCategory` collection',
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'AssetSubCategory',
    comment: 'taken from `AssetSubCategory` collection',
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
    comment: 'taken from `Industry` collection',
  },
  businessFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
    comment: 'taken from `BusinessFunction` collection',
  },
  businessSubFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessSubFunction',
    comment: 'taken from `BusinessSubFunction` collection',
  },
  imageAccessUrl: {
    type: String,
  },

  fileAccessUrls: [
    {
      type: String,
      comment: 'has the form `string[]`',
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
    comment: 'language',
  },
  format: {
    type: String,
  },
  size: {
    type: String,
  },
  coAuthor: {
    type: String,
    comment: '(email)',
  },
  downloadedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      comment:
        'has the from `objectId[]`. objectId taken from `User` collection',
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    comment: '`objectId` taken from `User` coll',
  },
  producerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    comment: '`objectId` taken from `User` coll',
  },
};

const assetsSchema: Schema = new Schema(definitions);

export const Assets = mongooseModel('Assets', assetsSchema);
