/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `stores business function`;

export const definitions = {
  name: {
    type: String,
  },
  uniqueName: {
    type: String,
  },
};

const BusinessFunctionSchema = new Schema(definitions);

export const BusinessFunction = mongooseModel(
  'BusinessFunction',
  BusinessFunctionSchema,
);
