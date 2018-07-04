import { Promise as BluePromise } from 'bluebird';
import { get as configGet } from 'config';
import mongoose = require('mongoose');

// Connect to MongoDB
const MONGO_URI: string = configGet('database.url');
console.log('connecting to ' + MONGO_URI); // tslint:disable-line

// Promisifying all mongoose methods
mongoose.Promise = BluePromise;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // tslint:disable-next-line
    console.log('Mongoose connected to ' + MONGO_URI);
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    // tslint:disable-next-line
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err,
    );
  });

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // tslint:disable-next-line
    console.log('Mongoose connection disconnected through app termination');
    process.exit(1);
  });
});

export default mongoose;
