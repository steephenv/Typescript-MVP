/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of skill sub category';

export const definitions = {
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'SkillCategory',
  },
  subCategory: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
};
const SkillSubCategorySchema: Schema = new Schema(definitions);
export const SkillSubCategory = mongooseModel(
  'SkillSubCategory',
  SkillSubCategorySchema,
);
