import { model as mongooseModel, Schema } from 'mongoose';

const personalDetailsSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    unique: true,
  },
  personalStatement: {
    type: String,
  },
  summary: {
    type: String,
  },
  firstName: {
    type: String,
  },
  maidenName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  countryOfBirth: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  workPermit: {
    type: String,
  },
  professionalId: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  houseNo: {
    type: String,
  },
  countryDialingCode: {
    type: Number,
  },
  cityDialingCode: {
    type: Number,
  },
  fixedLinePhone: {
    type: String,
  },
  mobilePhone: {
    type: String,
  },
  primaryEmail: {
    type: String,
  },
  secondaryEmail: {
    type: String,
  },
  taxId: {
    type: String,
  },
  vatId: {
    type: Number,
  },
  socialInsuranceId: {
    type: Number,
  },
  healthInsuranceType: {
    type: String,
  },
  healthInsurance: {
    type: String,
  },
  ibanNo: {
    type: String,
  },
  bicNo: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

// tslint:disable:variable-name
export const PersonalDetails = mongooseModel(
  'PersonalDetails',
  personalDetailsSchema,
);
