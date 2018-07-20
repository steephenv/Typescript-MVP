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
});
export const ProjectSubCategory = mongooseModel(
  'ProjectSubCategory',
  ProjectSubCategorySchema,
);
