/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';
// import { date } from 'joi';

const projectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  projectTittle: {
    type: String,
  },
  currentSituation: {
    type: String,
  },
  targetSituation: {
    type: String,
  },
  targetGroup: {
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  industryLine: {
    type: String,
  },
  businessFunctions: {
    type: String,
  },
  businessSubFunctions: {
    type: String,
  },
  projectStages: {
    type: String,
  },
  technology: {
    type: String,
  },
  projectMaturity: {
    type: String,
  },
  effort: {
    type: String,
  },
  price: {
    type: Number,
  },
  impact: {
    type: String,
  },
  impactLevel: {
    type: String,
  },
  picture: {
    type: String,
  },
  referenceIndustry: {
    type: String,
  },
  referenceClientTypes: {
    type: String,
  },
  referenceProjectDate: {
    type: Date,
  },
  referenceCountry: {
    type: String,
  },
  referenceLanguage: {
    type: String,
  },
});

export const Project = mongooseModel('Project', projectSchema);
