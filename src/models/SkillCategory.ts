/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details skill category';

export const definitions = {
  category: {
    type: String,
    require: true,
  },
  cluster: {
    type: String,
    enum: ['Personal', 'Leadership', 'Entrepreneurship', 'Functional'],
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
};
const SkillCategorySchema: Schema = new Schema(definitions);
export const SkillCategory = mongooseModel(
  'SkillCategory',
  SkillCategorySchema,
);
