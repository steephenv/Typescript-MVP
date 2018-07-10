/* tslint:disable:no-console */

/**
 * ts-node <this_file.ts> <mongodb_conn_uri>
 */
import { Promise as BluePromise } from 'bluebird';
import * as mongoose from 'mongoose';
import { getMongooseConnectionPromise } from './db-init';

import { initUsers } from './users';
import { createMVP } from './add-mvp';
import { createSlot } from './set-slots';

const resetDatabase = async (MONGO_URI?: string) => {
  try {
    await getMongooseConnectionPromise(MONGO_URI);
    console.log('connected to db');
    await BluePromise.all([
      mongoose.connection.db.dropCollection('users').catch(errHandler),
      mongoose.connection.db.dropCollection('tempusers').catch(errHandler),
    ]);
    await BluePromise.all([initUsers()]);
    await createSlot();
    await createMVP();
  } catch (err) {
    console.log(err);
  }
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
  return;
};

export = resetDatabase;

function errHandler(err: any) {
  if (err.code !== 26) {
    console.log(err);
    return;
  }
  throw err;
}
