/* tslint:disable:no-console */

import { Promise as BluePromise } from 'bluebird';
import * as mongoose from 'mongoose';
import { getMongooseConnectionPromise } from './db-init';

// import { initUsers } from './users';

import * as lme from 'lme';

console.log('==========DB-RESET=ENVS================');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_APP_INSTANCE: ${process.env.NODE_APP_INSTANCE}`);
console.log('=======================================');

const resetDatabase = async (MONGO_URI?: string) => {
  try {
    await getMongooseConnectionPromise(MONGO_URI);
    lme.i('> connected to db');
  } catch (err) {
    lme.e(err);
    process.exit(1);
  }

  try {
    await BluePromise.all([
      mongoose.connection.db.dropCollection('users').catch(errHandler),
    ]);
  } catch (err) {
    if (err.code === 26 || err.message === 'ns not found') {
      lme.s('> ns NotFound Error. This is expected. please ignore');
    } else {
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
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }

  return;
};

export = resetDatabase;

function errHandler(err: any) {
  if (err.code === 26 || err.message === 'ns not found') {
    lme.s('> ns NotFound Error. This is expected. please ignore');
  }
  throw err;
}
