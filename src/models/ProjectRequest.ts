/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description =
  'Stores details of project request forms submission data';

export const definitions = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  projectName: {
    type: String,
  },
  formType: {
    type: String,
    enum: ['tab1', 'tab2', 'tab3', 'tab4'],
  },
  consultantIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pmIds: [
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
    enum: ['Draft', 'Request', 'Ordered'],
  },
  templateType: {
    type: String,
    enum: [
      'SkillBased',
      'DeliverableBased',
      'ReadyToUse',
      'NeedExpertAdvisory',
    ],
  },
  submittedSections: {
    tab1: {
      type: Boolean,
    },
    tab2: {
      type: Boolean,
    },
    tab3: {
      type: Boolean,
    },
  },
  stakeHolders: [
    {
      // stakeHolder: {
      //   type: String,
      // },
      businessFunction: {
        type: Schema.Types.ObjectId,
        ref: 'BusinessFunction',
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
  additionalLocations: [
    {
      type: String,
    },
  ],
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
      travellingToLocations: [
        {
          type: String,
        },
      ],
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
        type: Schema.Types.ObjectId,
        ref: 'BusinessFunction',
      },
      functional: [
        {
          type: String,
        },
      ],
      personal: [
        {
          type: String,
        },
      ],
      leadership: [
        {
          type: String,
        },
      ],

      entrepreneurship: [
        {
          type: String,
        },
      ],
      desiredDailyRate: {
        type: String,
      },
      desiredDailyRateNumber: {
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
  deliverables: [
    {
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
        type: [String],
      },
      expectedDueDateOfDeliverable: {
        type: Date,
      },
      expectedPricePerDeliverable: {
        type: String,
      },
      expectedPricePerDeliverableNumber: {
        type: Number,
      },
    },
  ],
  expectedTotalPriceForValue: {
    type: String,
  },
  expectedTotalPriceForValueNumber: {
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
  topic: {
    type: String,
  },
  myAdvisoryNeed: {
    type: String,
  },
  earliestStartDate: {
    type: Date,
  },
  latestDueDate: {
    type: Date,
  },
  isDirect: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
  lessonsLearned: {
    type: String,
  },
  AssignedConsultants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pmStatus: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending'],
  },
  pmRejectMessage: {
    type: String,
  },
};
const projectRequestSchema: Schema = new Schema(definitions);

export const ProjectRequest = mongooseModel(
  'ProjectRequest',
  projectRequestSchema,
);
