"use strict";
/* tslint:disable:no-console */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bluebird_1 = require("bluebird");
const mongoose = require("mongoose");
const db_init_1 = require("./db-init");
// import { initUsers } from './users';
const lme = require("lme");
console.log('==========DB-RESET=ENVS================');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_APP_INSTANCE: ${process.env.NODE_APP_INSTANCE}`);
console.log('=======================================');
const resetDatabase = (MONGO_URI) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield db_init_1.getMongooseConnectionPromise(MONGO_URI);
        lme.i('> connected to db');
    }
    catch (err) {
        lme.e(err);
        process.exit(1);
    }
    try {
        yield bluebird_1.Promise.all([
            mongoose.connection.db.dropCollection('users').catch(errHandler),
        ]);
    }
    catch (err) {
        if (err.code === 26 || err.message === 'ns not found') {
            lme.s('> ns NotFound Error. This is expected. please ignore');
        }
        else {
            lme.e('err occurred');
            console.log(err);
            process.exit(1);
        }
    }
    // try {
    //   await BluePromise.all([initUsers()]);
    //   // await createAvail(); // heavy task. thats why running alone
    // } catch (err) {
    //   console.log(err);
    // }
    try {
        yield mongoose.disconnect();
    }
    catch (err) {
        console.log(err);
    }
    return;
});
function errHandler(err) {
    if (err.code === 26 || err.message === 'ns not found') {
        lme.s('> ns NotFound Error. This is expected. please ignore');
    }
    throw err;
}
module.exports = resetDatabase;
