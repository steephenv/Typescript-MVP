import { Transform } from 'stream';
import { obj as Through2ObjStream } from 'through2';
import { logger } from '../ipc-interface';

export function csvMethodApplier(
  csvParseStream: Transform,
  headerValidator: (
    csvHeader: string[],
  ) => Promise<{ successLog?: string; errLog?: string; push?: boolean }>,
  rowApplier: (
    csvRow: string[],
  ) => Promise<{ successLog?: string; errLog?: string; push?: boolean }>,
  logSuccess: (msg: string) => void,
  logError: (msg: string) => void,
) {
  let firstRowHandled = false;
  let pipeErrored = false;
  return Through2ObjStream(async function(chunk: string[], enc, callback) {
    if (pipeErrored) {
      logger('pipe-erred-hence skipping');
      this.push(chunk);
      return callback();
    }
    if (firstRowHandled) {
      // call rowApplierHere
      const { errLog, successLog, push = true } = await rowApplier(chunk);
      if (push) {
        this.push(chunk);
      }

      if (successLog) {
        logSuccess(successLog);
      }

      if (errLog) {
        logError(errLog);
      }
    } else {
      // call header fn here
      firstRowHandled = true;
      // logger('handling first row');
      const { errLog, successLog, push = true } = await headerValidator(chunk);
      if (push) {
        this.push(chunk);
      }
      if (successLog) {
        // logger(successLog + ' ' + successLog);
        logSuccess(successLog);
      }
      if (errLog) {
        pipeErrored = true;
        // logger('errrrrrrrrrrr');
        logError(errLog);
        logError(`>>> SINCE HEADER HAS ERROR, TERMINATING`);

        csvParseStream.destroy();
        // logger('streams destroyed');
      }
      // logger('callback-1');
      // return callback();
    }
    // logger('callback-2');
    callback();
  });
}
