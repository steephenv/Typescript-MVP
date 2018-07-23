/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const experienceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  typeOfEngagement: {
    type: String,
  },
  durationFrom: {
    type: String,
  },
  durationTo: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  businessFunction: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyIndustryLine: {
    type: String,
  },
  companySize: {
    type: String,
  },
  locationCountry: {
    type: String,
  },
  locationCity: {
    type: String,
  },
  locationState: {
    type: String,
  },
  stateIso: {
    type: String,
  },
  mainResponsibility: {
    type: String,
  },
  peopleManagementResponsibility: {
    type: String,
  },
  managedTeamSize: {
    type: Number,
  },
  budgetResponsibility: {
    type: Number,
  },
  managementType: {
    type: {
      disciplinaryManager: String,
      functionalSupervisor: String,
      coach: Boolean,
      none: Boolean,
    },
  },
});

export const Experience = mongooseModel('Experience', experienceSchema);
