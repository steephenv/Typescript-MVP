/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'stores edu details';
export const definitions = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedAt: {
    type: Date,
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
  stateIso: {
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
  mainSubjects: [
    {
      subject: {
        type: String,
      },
      grade: {
        type: String,
      },
    },
  ],
  activities: {
    type: String,
  },
};

const educationDetailsSchema = new Schema(definitions);

export const Education = mongooseModel('Education', educationDetailsSchema);
