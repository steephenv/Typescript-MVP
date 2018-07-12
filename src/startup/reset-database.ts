/* tslint:disable:no-console */

import { Promise as BluePromise } from 'bluebird';
import * as mongoose from 'mongoose';
import { getMongooseConnectionPromise } from './db-init';

import { initUsers } from './users';
import { createMVP } from './add-mvp';
import { createSlot } from './set-slots';
import { createCat } from './add-cat-subcat';
import * as lme from 'lme';

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
      mongoose.connection.db.dropCollection('tempusers').catch(errHandler),
      mongoose.connection.db
        .dropCollection('availabilitycalenders')
        .catch(errHandler),
      mongoose.connection.db.dropCollection('timeslots').catch(errHandler),
      mongoose.connection.db
        .dropCollection('skillsubcategories')
        .catch(errHandler),
      mongoose.connection.db
        .dropCollection('skillcategories')
        .catch(errHandler),
      mongoose.connection.db.dropCollection('educations').catch(errHandler),
      mongoose.connection.db
        .dropCollection('employeeprojects')
        .catch(errHandler),
      mongoose.connection.db
        .dropCollection('personaldetails')
        .catch(errHandler),
      mongoose.connection.db.dropCollection('experiences').catch(errHandler),
      mongoose.connection.db
        .dropCollection('employeeprojects')
        .catch(errHandler),
      mongoose.connection.db
        .dropCollection('customercredentials')
        .catch(errHandler),
    ]);
  } catch (err) {
    if (err.code === 26) {
      lme.w('> ns Not Found Error occurred (code 26) #ignoring');
    } else {
      lme.e('err occurred');
      console.log(err);
      process.exit(1);
    }
  }

  try {
    await BluePromise.all([initUsers(), createCat()]);

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
