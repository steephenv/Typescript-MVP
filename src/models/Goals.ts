/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const definitions = {
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
      targetProficiency: { type: String },
    },
  ],
  educationalTargets: [
    {
      durationFrom: {
        type: String,
      },
      activities: {
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
      grade: {
        type: String,
      },
      subject: {
        type: String,
      },
      subjectGrade: {
        type: String,
      },
    },
  ],
  annualAvailableCapacity: { type: Number },
  capricornsAvailableCapacity: { type: Number },
  income: { type: Number },
  startDate: { type: String },
  incomePerMonth: { type: String },
  incomePerDay: { type: String },
  remainingIncome: { type: Number },
  targetAnnualIncome: { type: Number },
  targetAnnualIncomeCapricorns: { type: Number },
};

const GoalSchema: Schema = new Schema(definitions);

export const Goals = mongooseModel('Goals', GoalSchema);
