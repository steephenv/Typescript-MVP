import { Promise as BluePromise } from 'bluebird';
import * as ps from 'ps-node';

const JOB_LOC = 'worker/index';

export function isWorkerRunning(): PromiseLike<boolean> {
  return new BluePromise((resolve, reject) => {
    ps.lookup(
      { command: 'node', arguments: JOB_LOC },
      (err: string, result: any[]) => {
        if (err) {
          return reject(err);
        }
        if (result.length) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      },
    );
  });
}
