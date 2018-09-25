/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `stores asset categories name`;
export const definitions = {
  name: {
    type: String,
    require: true,
  },
};

const AssetCategorySchema: Schema = new Schema();

export const AssetCategory = mongooseModel(
  'AssetCategory',
  AssetCategorySchema,
);
