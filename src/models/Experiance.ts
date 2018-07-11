import { model as mongooseModel, Schema } from 'mongoose';

const experianceSchema = new Schema({
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
  duration: {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
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
    type: Number,
  },
});

export const experiance = mongooseModel('ExperianceSchema', experianceSchema);
