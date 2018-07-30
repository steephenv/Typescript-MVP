/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const BusinessSubFunctionSchema: Schema = new Schema({
  subFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
  },
  subFunction: {
    type: String,
  },
});
export const TempBusSubFunction = mongooseModel(
  'TempBusSubFunction',
  BusinessSubFunctionSchema,
);
