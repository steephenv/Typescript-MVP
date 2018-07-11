import { model as mongooseModel, Schema } from 'mongoose';

const personalDetailsSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
  },
  PersonalStatement: {
    type: String,
  },
  Summary: {
    type: String,
  },
  firstName: {
    type: String,
  },
  MaidenName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  foto: {
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
    type: Number,
  },
  houseNo: {
    type: Number,
  },
  countryDialingCode: {
    type: Number,
  },
  cityDialingCode: {
    type: Number,
  },
  fixedLinePhone: {
    type: Number,
  },
  mobilePhone: {
    type: Number,
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
    type: String,
  },
  socialInsuranceId: {
    type: String,
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

export const personalDetails = mongooseModel(
  'personalDetailsSchema',
  personalDetailsSchema,
);
