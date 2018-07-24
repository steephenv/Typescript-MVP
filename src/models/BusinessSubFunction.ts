/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const BusinessSubFunctionSchema: Schema = new Schema({
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
  },
  subCategory: {
    type: String,
  },
});
export const BusinessSubFunction = mongooseModel(
  'BusinessSubFunction',
  BusinessSubFunctionSchema,
);
