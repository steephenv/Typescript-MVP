/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const projectRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  formType: {
    type: String,
    enum: ['tab1', 'tab2', 'tab3'],
  },
  consultantIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Draft', 'Request'],
  },
  templateType: {
    type: String,
    enum: ['SkillBased', 'DeliverableBased', 'ReadyToUse'],
  },
  submittedSections: {
    tab1: Boolean,
    tab2: Boolean,
    tab3: Boolean,
  },
  stakeHolders: [
    {
      stakeHolder: {
        type: String,
      },
      businessFunction: {
        type: String,
      },
      businessFunctionRole: {
        type: String,
      },
    },
  ],
  sponsorsPosition: {
    type: String,
  },
  managersPosition: {
    type: String,
  },
  currentStatus: {
    type: String,
  },
  currentSituation: {
    type: String,
  },
  challengeType: {
    type: String,
  },
  challenge: {
    type: String,
  },
  degreeOfChallenge: {
    type: String,
  },
  goalValueAdd: {
    type: String,
  },
  desiredFutureSituation: {
    type: String,
  },
  targetStart: {
    type: Date,
  },
  expectedEnd: {
    type: Date,
  },
  mainLocation: {
    type: String,
  },
  additionalLocations: {
    type: String,
  },
  location2: {
    type: String,
  },
  location3: {
    type: String,
  },
  location4: {
    type: String,
  },
  communication: {
    type: String,
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
  // Need for Project support ......
  noOfExpectedDeliverables: {
    type: String,
  },
  nameOfDeliverables: {
    type: String,
  },
  typeOfDeliverables: {
    type: String,
  },
  languageOfDeliverable: {
    type: String,
  },
  briefDescriptionOfDeliverable: {
    type: String,
  },
  expectedValueAddOfDeliverable: {
    type: String,
  },
  expectedQualityOfDeliverable: {
    type: String,
  },
  expectedDueDateOfDeliverable: {
    type: String,
  },
  expectedTotalPriceForValue: {
    type: Number,
  },
  expectedPricePerDeliverable: {
    type: Number,
  },
  travelExpPercentageOfTotalPriceForValue: {
    type: String,
  },
  proposalSelectionBasedOn: {
    type: String,
  },
  bestFitNo: {
    type: Number,
  },
});

export const ProjectRequest = mongooseModel(
  'ProjectRequest',
  projectRequestSchema,
);
