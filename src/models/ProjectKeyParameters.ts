import { model as mongooseModel, Schema } from 'mongoose';

const projectKeyParamSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
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
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
});

// tslint:disable:variable-name
export const ProjectKeyParameters = mongooseModel(
  'ProjectKeyParameters',
  projectKeyParamSchema,
);
