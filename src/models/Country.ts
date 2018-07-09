import { model as mongooseModel, Schema } from 'mongoose';

const countrySchema: Schema = new Schema({});
export const country = mongooseModel('countrySchema', countrySchema);
