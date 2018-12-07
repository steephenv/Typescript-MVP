"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const config_1 = require("config");
const mongoose = require("mongoose");
// Connect to MongoDB
// Promisifying all mongoose methods
mongoose.Promise = bluebird_1.Promise;
exports.getMongooseConnectionPromise = (MONGO_URI = config_1.get('database.url')) => {
    console.log('connecting to ' + MONGO_URI); // tslint:disable-line
    return mongoose.connect(MONGO_URI);
};
