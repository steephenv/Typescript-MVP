/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const ProjectCategorySchema: Schema = new Schema({
  category: {
    type: String,
    require: true,
  },
  cluster: {
    type: String,
    enum: ['Personal', 'Leadership', 'Entrepreneurship', 'Functional'],
  },
});
export const ProjectCategory = mongooseModel(
  'projectCategory',
  ProjectCategorySchema,
);
