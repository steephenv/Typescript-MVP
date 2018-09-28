import { Readable } from 'stream';
import { obj as Through2ObjStream } from 'through2';

export function methodApplier(
  csvReadStream: Readable,
  headerValidator: (
    csvHeader: string[],
  ) => Promise<{ successLog: string; errLog: string; push: boolean }>,
  rowApplier: (
    csvRow: string[],
  ) => Promise<{ successLog: string; errLog: string; push: boolean }>,
  logSuccess: (msg: string) => void,
  logError: (msg: string) => void,
) {
  let firstRowHandled = false;
  return Through2ObjStream(async function(chunk: string[], enc, callback) {
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
      firstRowHandled = true;
      // call header fn here
      const { errLog, successLog, push = true } = await headerValidator(chunk);
      if (push) {
        this.push(chunk);
      }
      if (successLog) {
        logSuccess(successLog);
      }
      if (errLog) {
        logError(errLog);
        logError(`>>> SINCE HEADER HAS ERROR, TERMINATING`);

        csvReadStream.destroy();
      }
    }

    callback();
  });
}
