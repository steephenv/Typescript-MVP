/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const IndustryLineSchema: Schema = new Schema({
  industryLine: {
    type: String,
    require: true,
  },
});
export const IndustryLine = mongooseModel('IndustryLine', IndustryLineSchema);
