import { model as mongooseModel, Schema } from 'mongoose';

const personalDetailsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  personalStatement: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
    type: String,
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
  state: {
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
  submitted: {
    type: Boolean,
    default: false,
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
