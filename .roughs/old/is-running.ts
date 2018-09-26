import { Promise as BluePromise } from 'bluebird';
import * as ps from 'ps-node';

const jobMap: any = {
  COMPANY_UPLOAD: {
    command: 'node',
    args: 'company-uploads/index',
  },
  USER_UPLOAD: {
    command: 'node',
    args: 'user-uploads/index',
  },
};

export const isJobRunning = (job: string) => {
  return new BluePromise((resolve, reject) => {
    const { command, args } = jobMap[job];

    ps.lookup(
      {
        command,
        arguments: args,
      },
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
};
