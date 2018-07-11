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
  engagementDuration: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
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
    type: String,
  },
  projectComplexity: {
    type: String,
  },
  projectComplexityTypes: {
    type: [],
  },
  projectRegionalReach: {
    type: String,
  },
  yourRole: {
    type: String,
  },
  projectteamSize: {
    type: Number,
  },
  budgetResponsibility: {
    type: String,
  },
  yourMainResults: {
    type: String,
  },
  applicableToOtherCompanies: {
    type: String,
  },
  roleDescription: {
    type: String,
  },
});

export const projects = mongooseModel('ProjectsSchema', projectsSchema);
