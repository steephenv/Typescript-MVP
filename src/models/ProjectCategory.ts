/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const ProjectCategorySchema: Schema = new Schema({
  category: {
    type: String,
    require: true,
  },
});
export const ProjectCategory = mongooseModel(
  'ProjectCategory',
  ProjectCategorySchema,
);
