/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details project category info';

export const definitions = {
  category: {
    type: String,
    require: true,
  },
  isDelete: { type: Boolean, default: false },
};
const ProjectCategorySchema: Schema = new Schema(definitions);
export const ProjectCategory = mongooseModel(
  'ProjectCategory',
  ProjectCategorySchema,
);
