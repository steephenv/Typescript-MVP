"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("config");
const lme = require("lme");
const resetDatabase = require("./reset-database");
/**
 * how to run?
 * ===========
 * ts-node reset.ts <mongodb_conn_uri>
 */
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
// prettier-ignore
console.log(`Database selected: ${process.argv[2] || config_1.get('database.url')}`);
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
resetDatabase(process.argv[2])
    .then(() => console.log('db reset complete')) // tslint:disable-line
    .catch(err => lme.e(err)); // tslint:disable-line
