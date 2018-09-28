import * as csv from 'fast-csv';
import { Promise as BluePromise } from 'bluebird';
import { createReadStream } from 'fs';

import { WorkerTask } from '../worker-task.type';
import { logger } from '../../ipc-interface';

import { getFileToSystem } from '../../utils/download-file';
import { csvMethodApplier } from '../../utils/csv-method-applier';

import { headerValidator } from './header-validator';
import { rowApplier } from './row-applier';

export const skillCategoryUpload: WorkerTask = async file => {
  logger('@skillCategoryUpload handling ' + file);

  const localFilePath = await getFileToSystem(file); // file;

  const csvFileReadStream = createReadStream(localFilePath);
  const csvParserStream = csv();

  const successLog: string[] = [];
  const errLog: string[] = [];
  function logSuccess(msg: string) {
    successLog.push(msg);
  }
  function logError(msg: string) {
    errLog.push(msg);
  }

  function streamPromise() {
    return new BluePromise((resolve, reject) => {
      csvFileReadStream
        .pipe(csvParserStream)
        .pipe(
          csvMethodApplier(
            csvFileReadStream,
            headerValidator,
            rowApplier,
            logSuccess,
            logError,
          ),
        )
        .on('data', data => {
          logger('data - ' + data);
          // csvFileReadStream.destroy();
        })
        .on('close', () => {
          logger('close');
          resolve();
        })
        .on('end', (data: any) => {
          logger('stream end - exiting');
          resolve();
        })
        .on('error', err => {
          logger('stream err - exiting');
          logError(err.message);
          reject(err);
        });
    });
  }

  await streamPromise();

  logger('s > ' + successLog.toString());
  logger('e > ' + errLog.toString());
  return { successLog, errLog };
};

// skillCategoryUpload(
//   // 'http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportUsersSample.csv',
//   join(__dirname, 'sample-csv'),
// );
