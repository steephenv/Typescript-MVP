/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';
import { EmployeeProjects } from './EmployeeProjects';

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
    type: Number,
  },
  locationCountry: {
    type: String,
  },
  locationCity: {
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
    type: String,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: EmployeeProjects,
    },
  ],
});

export const Experience = mongooseModel('Experience', experienceSchema);
