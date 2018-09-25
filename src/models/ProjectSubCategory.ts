/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of project sub category info';

export const definitions = {
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectCategory',
  },
  subCategory: {
    type: String,
  },
  isDelete: { type: Boolean, default: false },
};
const ProjectSubCategorySchema: Schema = new Schema(definitions);
export const ProjectSubCategory = mongooseModel(
  'ProjectSubCategory',
  ProjectSubCategorySchema,
);
