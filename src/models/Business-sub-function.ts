/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const definitions = {
  name: {
    type: String,
    require: true,
  },
  businessFunctionId: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
  },
};

const BusinessSubFunctionSchema: Schema = new Schema(definitions);

export const BusinessSubFunction = mongooseModel(
  'BusinessSubFunction',
  BusinessSubFunctionSchema,
);
