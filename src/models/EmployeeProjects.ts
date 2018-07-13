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
    type: String,
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
    type: String,
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
    type: String,
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
});

export const EmployeeProjects = mongooseModel(
  'EmployeeProjects',
  projectsSchema,
);
