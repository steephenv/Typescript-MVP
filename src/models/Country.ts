import { model as mongooseModel, Schema } from 'mongoose';

const countrySchema: Schema = new Schema({
  id: String,
  iso: String,
  local_name: String,
  type: String,
  in_location: String,
  geo_lat: String,
  geo_lng: String,
  db_id: String,
});

export const country = mongooseModel('Country', countrySchema);
