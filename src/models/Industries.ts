/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const IndustrySchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
});
export const Industry = mongooseModel('Industry', IndustrySchema);
