import { model as mongooseModel, Schema } from 'mongoose';

const educationDetailsSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  duration: {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
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
  major: {
    type: String,
  },
  degree: {
    type: String,
  },
  grade: {
    type: String,
  },
  mainSubjects: {
    type: [
      {
        subjectName: String,
        grade: String,
      },
    ],
  },
  activities: [
    {
      type: String,
    },
  ],
});

export const educationDetails = mongooseModel(
  'Education',
  educationDetailsSchema,
);
