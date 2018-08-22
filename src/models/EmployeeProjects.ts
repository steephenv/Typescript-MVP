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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  submitted: {
    type: Boolean,
    default: false,
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
  stateIso: {
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
    default: 'Short Term',
  },
  projectSize: {
    type: String,
    default: 'Small',
  },
  projectComplexity: {
    type: String,
    default: 'Simple',
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
    type: Number,
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
  locationState: {
    type: String,
  },
});

export const EmployeeProjects = mongooseModel(
  'EmployeeProjects',
  projectsSchema,
);
