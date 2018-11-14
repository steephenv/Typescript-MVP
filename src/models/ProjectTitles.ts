/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of project title info';
export const definitions = {
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  projectTitle: {
    type: String,
  },
};
const ProjectTitleSchema: Schema = new Schema(definitions);

export const ProjectTitle = mongooseModel('ProjectTitle', ProjectTitleSchema);
