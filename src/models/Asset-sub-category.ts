/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const AssetSubCategorySchema: Schema = new Schema({
  subCategoryName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'AssetCategory',
  },
});

export const AssetSubCategory = mongooseModel(
  'AssetSubCategory',
  AssetSubCategorySchema,
);
