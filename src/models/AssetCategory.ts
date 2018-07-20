/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const AssetCategorySchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
});
export const AssetCategory = mongooseModel(
  'AssetCategory',
  AssetCategorySchema,
);
