/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const educationDetailsSchema = new Schema({
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
      subject: String,
      grade: String,
    },
  ],
  activities: {
    type: String,
  },
});

export const Education = mongooseModel('Education', educationDetailsSchema);
