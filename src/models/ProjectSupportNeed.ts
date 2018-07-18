import { model as mongooseModel, Schema } from 'mongoose';
// import { WSAEADDRINUSE } from 'constants';

const projectSupportNeedSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  roleAndResponsibility: [
    {
      consultant: {
        type: String,
      },
      requiredHeadCount: {
        type: Number,
      },
      requiredRole: {
        type: String,
      },
      mainResponsibility: {
        type: String,
      },
      engagementStart: {
        type: Date,
      },
      engagementEnd: {
        type: Date,
      },
      reqCapacityWorkDays: {
        type: String,
      },
      reqCapacityInFTE: {
        type: String,
      },
      avgCapacityPerWeek: {
        type: String,
      },
      confirmAvgCapacity: {
        type: String,
      },
      onsiteAvailability: {
        type: String,
      },
      travellingRequired: {
        type: String,
      },
      travellingToLocations: [String],
      travellingFrequency: {
        type: String,
      },
    },
  ],
  skillsAndExperience: [
    {
      role: {
        type: String,
      },
      yearsOfProfessionalExp: {
        type: String,
      },
      clientsIndustryExp: {
        type: String,
      },
      clientsCompanyExp: {
        type: String,
      },
      businessFunction: {
        type: String,
      },
      functional: [String],
      personal: [String],
      leadership: [String],
      entrepreneurship: [String],
      desiredDailyRate: {
        type: Number,
      },
      travellingExpensePercentage: {
        type: String,
      },
      proposalSelectionMode: {
        type: String,
      },
    },
  ],
  clientsMessage: {
    type: String,
  },
  proposalSubmissionDate: {
    type: Date,
  },
});

// tslint:disable:variable-name
export const ProjectSupportNeed = mongooseModel(
  'ProjectSupportNeed',
  projectSupportNeedSchema,
);
