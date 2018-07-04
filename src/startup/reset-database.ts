/* tslint:disable:no-console */
import { Promise as BluePromise } from 'bluebird';

const resetDatabase = () => {
  return new BluePromise(resolve => {
    console.log('resetting database');
    return resolve();
  });
};

export = resetDatabase;
