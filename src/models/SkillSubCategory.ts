/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const SkillSubCategorySchema: Schema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'SkillCategory',
  },
  subCategory: {
    type: String,
  },
});
export const SkillSubCategory = mongooseModel(
  'SkillSubCategory',
  SkillSubCategorySchema,
);
