/* tslint:disable:no-console */

import { Promise as BluePromise } from 'bluebird';
import * as mongoose from 'mongoose';
import { getMongooseConnectionPromise } from './db-init';

import { initUsers } from './users';
import { createCat } from './add-cat-subcat';
import { createProjCat } from './add-proj-cat-subcat';
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
        .dropCollection('customercredentials')
        .catch(errHandler),
      mongoose.connection.db
        .dropCollection('projectcategories')
        .catch(errHandler),
      mongoose.connection.db
        .dropCollection('projectsubcategories')
        .catch(errHandler),
      mongoose.connection.db.dropCollection('projects').catch(errHandler),
    ]);
  } catch (err) {
    if (err.code === 26) {
      lme.s('> ns NotFound Error. This is expected. please ignore');
    } else {
      lme.e('err occurred');
      console.log(err);
      process.exit(1);
    }
  }

  try {
    await BluePromise.all([initUsers(), createCat(), createProjCat()]);
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
