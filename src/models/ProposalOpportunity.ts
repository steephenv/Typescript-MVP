/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of proposal opportunity form data';
export const definitions = {
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
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  projectRequestId: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectRequest',
  },
  totalPriceInEUR: {
    type: Number,
  },
  travellingExpense: {
    type: String,
  },
  expectedDeliveryDate: {
    type: Date,
  },
  teamExperience: {
    type: String,
  },
  pdfUpload: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
};
const ProposalOpportunitySchema: Schema = new Schema(definitions);

export const ProposalOpportunity = mongooseModel(
  'ProposalOpportunity',
  ProposalOpportunitySchema,
);
