import { Promise as BluePromise } from 'bluebird';
import { get as configGet } from 'config';
import mongoose = require('mongoose');

// Connect to MongoDB
const MONGO_URI: string = configGet('database.url');
// console.log('connecting to ' + MONGO_URI); // tslint:disable-line

// Promisifying all mongoose methods
mongoose.Promise = BluePromise;

export const mongooseConnectionPromise = mongoose.connect(MONGO_URI);

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // tslint:disable-next-line
    console.log('Mongoose connection disconnected through app termination');
    process.exit(1);
  });
});

export { mongoose };
