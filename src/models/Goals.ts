/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const GoalSchema: Schema = new Schema({
  clientRating: {
    type: String,
    required: true,
  },
  teamRating: {
    type: String,
    required: true,
  },
  personalStatement: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  industryExperience: [{ type: String }],
  functionalExperience: [{ type: String }],
  subjectMatter: [{ type: String }],
  taskExperience: [{ type: String }],
  certifications: [{ type: String }],
  assets: [{ type: String }],
  educationalTarget: [{ type: String }],
  socialSkills: [{ type: String }],
  peopleDevelopment: [{ type: String }],
  businessDevelopment: [{ type: String }],
  annualAvailableCapacity: { type: String },
  capricornsAvailableCapacity: { type: String },
  income: { type: String },
  incomeUnit: { type: String },
  startDate: { type: String },
  daysLeftInYear: { type: String },
  daysLeftInCapricorns: { type: String },
  targetAnnualIncome: { type: String },
  targetAnnualIncomeCapricorns: { type: String },
});

export const Goals = mongooseModel('Goals', GoalSchema);
