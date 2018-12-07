"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const config_1 = require("config");
const mongoose = require("mongoose");
exports.mongoose = mongoose;
const lme = require("lme");
// Connect to MongoDB
const MONGO_URI = config_1.get('database.url');
lme.i('> connecting to ' + MONGO_URI);
// Promisifying all mongoose methods
mongoose.Promise = bluebird_1.Promise;
exports.mongooseConnectionPromise = mongoose.connect(MONGO_URI);
