/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'stores basic company info';
export const definitions = {
  description: {
    type: String,
  },
  heading: {
    type: String,
  },
  subHeading: {
    type: String,
  },
};

const companySchema: Schema = new Schema(definitions);
export const Company = mongooseModel('Company', companySchema);
