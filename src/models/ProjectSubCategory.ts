/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const ProjectSubCategorySchema: Schema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectCategory',
  },
  subCategory: {
    type: String,
  },
  isDelete: { type: Boolean, default: false },
});
export const ProjectSubCategory = mongooseModel(
  'ProjectSubCategory',
  ProjectSubCategorySchema,
);
