/**
 * leveldb interface
 */

import { join as pathJoin } from 'path';
import * as userHome from 'user-home';
import * as mkdirp from 'mkdirp';
import { existsSync } from 'fs';
import * as log from 'fancy-log';
import * as level from 'level';
import { Promise as BluePromise } from 'bluebird';

const DB_STORE_LOC = pathJoin(userHome, '.miwago-leveldb');

if (!existsSync(DB_STORE_LOC)) {
  log(`leveldb store (${DB_STORE_LOC}) not found. creating one`);
  mkdirp.sync(DB_STORE_LOC);
}

if (existsSync(DB_STORE_LOC)) {
  log(`leveldb store (${DB_STORE_LOC}) verified`);
} else {
  log(`leveldb store (${DB_STORE_LOC}) couldn't be created !!!`);
}

export const db = level(DB_STORE_LOC);

export function put(key: string, val: any) {
  return new BluePromise((resolve, reject) => {
    db.put(key, val, (err: Error) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

export function get(key: string) {
  return new BluePromise((resolve, reject) => {
    db.get(key, (err: Error, val: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(val);
    });
  });
}

export function del(key: string) {
  return new BluePromise((resolve, reject) => {
    db.del(key, (err: Error) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

// verify leveldb is working
// put('cat', 'fluffy')
//   .then(() => get('cat'))
//   .then(data => console.log(data))
//   .then(() => del('cat'));
