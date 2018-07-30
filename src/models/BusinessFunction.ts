/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const BusinessFunctionSchema: Schema = new Schema({
  businessFunction: {
    type: String,
    require: true,
  },
});
export const TempBusFunction = mongooseModel(
  'TempBusFunction',
  BusinessFunctionSchema,
);
