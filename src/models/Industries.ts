/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores industry line details';

export const definitions = {
  name: {
    type: String,
    require: true,
  },
};
const IndustrySchema: Schema = new Schema(definitions);
export const Industry = mongooseModel('Industry', IndustrySchema);
