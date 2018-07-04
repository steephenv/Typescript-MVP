/* tslint:disable:no-console */

import { get as getConfig } from 'config';
import * as lme from 'lme';

import * as resetDatabase from './reset-database';

console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
// prettier-ignore
console.log(`Database selected: ${ getConfig('database.url')}`);
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

resetDatabase()
  .then(() => console.log('db reset complete')) // tslint:disable-line
  .catch(err => lme.e(err)); // tslint:disable-line
