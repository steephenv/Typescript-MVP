/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const BusinessFunctionSchema = new Schema({
  name: String,
});

export const BusinessFunction = mongooseModel(
  'BusinessFunction',
  BusinessFunctionSchema,
);
