/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const BusinessSubFunctionSchema: Schema = new Schema({
  subFunctionName: {
    type: String,
    require: true,
  },
  businessFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
  },
});

export const BusinessSubFunction = mongooseModel(
  'BusinessSubFunction',
  BusinessSubFunctionSchema,
);
