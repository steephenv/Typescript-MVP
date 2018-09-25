/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `stores sub categories`;

export const definitions = {
  subCategoryName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'AssetCategory',
    comment: 'taken from `AssetCategory` collection',
  },
};

const AssetSubCategorySchema: Schema = new Schema(definitions);

export const AssetSubCategory = mongooseModel(
  'AssetSubCategory',
  AssetSubCategorySchema,
);
