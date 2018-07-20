/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const AssetCategorySchema: Schema = new Schema({
  category: {
    type: String,
    require: true,
  },
});
export const AssetCategory = mongooseModel(
  'AssetCategory',
  AssetCategorySchema,
);
