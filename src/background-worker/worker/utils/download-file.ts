import * as got from 'got';
import * as fs from 'fs';
import * as userHome from 'user-home';
import * as mkdirp from 'mkdirp';
import { join as pathJoin } from 'path';
import * as shortid from 'shortid';
import { Promise as BluePromise } from 'bluebird';

import { logger } from '../ipc-interface';

const FILE_UPLOAD_PATH = pathJoin(userHome, '.miwago-temp');

if (!fs.existsSync(FILE_UPLOAD_PATH)) {
  logger(`upload folder (${FILE_UPLOAD_PATH}) not found. creating one`);
  mkdirp.sync(FILE_UPLOAD_PATH);
}

if (fs.existsSync(FILE_UPLOAD_PATH)) {
  logger(`upload folder (${FILE_UPLOAD_PATH}) verified`);
} else {
  logger(`upload folder (${FILE_UPLOAD_PATH}) couldn't be created !!!`);
}

export async function getFileToSystem(file: string) {
  // const fileName = pathJoin(FILE_UPLOAD_PATH, 'new');
  const id = shortid.generate();

  function streamFile() {
    return new BluePromise((resolve, reject) => {
      const gotStream = got.stream(file);
      // put part to server
      gotStream.on('response', res => {
        res
          .pipe(fs.createWriteStream(pathJoin(FILE_UPLOAD_PATH, `${id}`)))
          .on('close', () => resolve())
          .on('error', err => reject(err));
      });
    });
  }

  await streamFile();
  logger('file streamed and downloaded');
  return pathJoin(FILE_UPLOAD_PATH, `${id}`);
}

// getFileToSystem('https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv')
//   .then(file => logger(`hmm:${file}`))
//   .catch(err => logger(err));
