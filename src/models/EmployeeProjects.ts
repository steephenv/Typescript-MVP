/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const projectsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  engagementAs: {
    type: String,
  },
  engagementFrom: {
    type: String,
  },
  engagementTo: {
    type: String,
  },
  projectName: {
    type: String,
  },
  clientsCompanyName: {
    type: String,
  },
  companyIndustryLine: {
    type: String,
  },
  clientsCompanySize: {
    type: Number,
  },
  locationCountry: {
    type: String,
  },
  locationCity: {
    type: String,
  },
  businessFunction: {
    type: String,
  },
  projectGoal: {
    type: String,
  },
  projectDuration: {
    type: String,
  },
  projectSize: {
    type: Number,
  },
  projectComplexity: {
    type: String,
  },
  projectComplexityTypes: {
    type: String,
  },
  projectRegionalReach: {
    type: String,
  },
  role: {
    type: String,
  },
  projectTeamSize: {
    type: Number,
  },
  budgetResponsibility: {
    type: String,
  },
  mainResults: {
    type: String,
  },
  applicableToOtherCompanies: {
    type: String,
  },
  roleDescription: {
    type: String,
  },
  experience: {
    type: Schema.Types.ObjectId,
    ref: 'Experience',
  },
});

export const EmployeeProjects = mongooseModel(
  'EmployeeProjects',
  projectsSchema,
);
