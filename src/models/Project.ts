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
  projectTitle: {
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
    type: Schema.Types.ObjectId,
    ref: 'ProjectCategory',
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectSubCategory',
  },
  industryLine: {
    type: Schema.Types.ObjectId,
    ref: 'Industry',
  },
  businessFunctions: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessFunction',
  },
  businessSubFunctions: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessSubFunction',
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
  deliverables: {
    type: [String],
  },
  duration: {
    type: String,
  },
  producerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Project = mongooseModel('Project', projectSchema);
