/* tslint:disable:no-console */

import { get as getConfig } from 'config';
import * as lme from 'lme';

import * as resetDatabase from './reset-database';

console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
// prettier-ignore
console.log(`Database selected: ${ getConfig('database.host')}:${getConfig('database.url')}`);
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

resetDatabase()
  .then(() => console.log('db reset complete:temp fix: check issue #16')) // tslint:disable-line
  .catch(err => lme.e(err)); // tslint:disable-line
