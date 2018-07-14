/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const SkillCategorySchema: Schema = new Schema({
  category: {
    type: String,
    require: true,
  },
  cluster: {
    type: String,
    enum: ['Personal', 'Leadership', 'Entrepreneurship', 'Functional'],
  },
});
export const SkillCategory = mongooseModel(
  'SkillCategory',
  SkillCategorySchema,
);
