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
  submitted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
  skillTargets: [
    {
      skillId: { type: Schema.Types.ObjectId, ref: 'Skills' },
      targetProficiency: String,
    },
  ],
  educationalTargets: [
    {
      durationFrom: {
        type: String,
      },
      durationTo: {
        type: String,
      },
      typeOfInstitution: {
        type: String,
      },
      nameOfInstitution: {
        type: String,
      },
      locationCountry: {
        type: String,
      },
      locationCity: {
        type: String,
      },
      locationState: {
        type: String,
      },
      major: {
        type: String,
      },
      degree: {
        type: String,
      },
    },
  ],
  annualAvailableCapacity: { type: Number },
  capricornsAvailableCapacity: { type: Number },
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
