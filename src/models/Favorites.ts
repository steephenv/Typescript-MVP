/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

const favoritesSchema = new Schema({
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
  collectionTypeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Favorites = mongooseModel('Favorites', favoritesSchema);
