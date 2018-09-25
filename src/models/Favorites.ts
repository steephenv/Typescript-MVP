/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';
// import { Project } from './Project';

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
  type: {
    type: String,
  },
  projectsId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  assetsId: {
    type: Schema.Types.ObjectId,
    ref: 'Assets',
  },
};

const favoritesSchema = new Schema(definitions);

export const Favorites = mongooseModel('Favorites', favoritesSchema);
