/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores question and answers';
export const definitions = {
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'ProjectRequest',
  },
  type: {
    type: String,
  },
  askedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: String,
  },
  askedByName: {
    type: String,
  },
  answer: [
    {
      text: { type: String },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      answeredAt: {
        type: Date,
      },
      answeredByName: {
        type: String,
      },
    },
  ],
};
const QuestionnaireSchema: Schema = new Schema(definitions);

export const Questionnaire = mongooseModel(
  'Questionnaire',
  QuestionnaireSchema,
);
