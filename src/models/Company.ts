/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

const companySchema: Schema = new Schema({
  description: {
    type: String,
  },
  heading: {
    type: String,
  },
  subHeading: {
    type: String,
  },
});
export const Company = mongooseModel('Company', companySchema);
