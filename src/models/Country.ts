import { model as mongooseModel, Schema } from 'mongoose';

export const description = `stores country info`;
export const definitions = {
  id: { type: String },
  iso: { type: String },
  local_name: { type: String },
  type: { type: String },
  in_location: { type: String },
  geo_lat: { type: String },
  geo_lng: { type: String },
  db_id: { type: String },
};

const countrySchema: Schema = new Schema(definitions);

export const country = mongooseModel('Country', countrySchema);
