import { Promise as BluePromise } from 'bluebird';
import { get as configGet } from 'config';
import mongoose = require('mongoose');

// Connect to MongoDB

// Promisifying all mongoose methods
mongoose.Promise = BluePromise;

export const getMongooseConnectionPromise = (
  MONGO_URI: string = configGet('database.url'),
) => {
  console.log('connecting to ' + MONGO_URI); // tslint:disable-line
  return mongoose.connect(MONGO_URI);
};
