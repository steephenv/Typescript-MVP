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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
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
  incomePerAnnum: String,
  incomePerMonth: String,
  incomePerWeek: String,
  incomePerDay: String,
  incomePerHour: String,
  daysLeftInYear: { type: Number },
  daysLeftInCapricorns: { type: Number },
  targetAnnualIncome: { type: Number },
  targetAnnualIncomeCapricorns: { type: Number },
});

export const Goals = mongooseModel('Goals', GoalSchema);
