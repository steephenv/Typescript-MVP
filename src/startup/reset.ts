/* tslint:disable:no-console */

import { get as getConfig } from 'config';
import * as lme from 'lme';

import * as resetDatabase from './reset-database';

/**
 * how to run?
 * ===========
 * ts-node reset.ts <mongodb_conn_uri>
 */
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
// prettier-ignore
console.log(`Database selected: ${ process.argv[2] || getConfig('database.url')}`);
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

resetDatabase(process.argv[2])
  .then(() => console.log('db reset complete')) // tslint:disable-line
  .catch(err => lme.e(err)); // tslint:disable-line
