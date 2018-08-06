/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const projectRequestSchema = new Schema({
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
  templateType: {
    type: String,
  },
  stakeHolder: {
    type: String,
  },
  businessFunction: {
    type: String,
  },
  businessFunctionRole: {
    type: String,
  },
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
    type: String,
  },
  expectedEnd: {
    type: String,
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
  // proposalSubmissionDate: {
  //   type: Date,
  // },
  // clientsMessage: {
  //   type: String,
  // },
});

export const ProjectRequest = mongooseModel(
  'ProjectRequest',
  projectRequestSchema,
);
