import { obj as ThroughObjectStream } from 'through2';
import { logger } from './ipc-interface';
import { BackgroundTaskQueue } from '../../models/BackgroundTaskQueue';
import { Tasks } from '../jobs/task-list';

// tasks
import { catTest } from '../jobs/cat-test';

interface IDBTask {
  functionName: Tasks;
  file: string;
  _id: string;
}

export const functionApplier = ThroughObjectStream(async function(
  chunk: IDBTask,
  enc,
  callback,
) {
  let errOccurred = false;

  // task selector
  logger(`task:${chunk.functionName} (${chunk._id})`);

  switch (chunk.functionName) {
    case Tasks.CAT_TEST:
      await catTest(chunk.file);
      break;
    default:
      logger(`unknown function ${chunk.functionName} found (${chunk._id})`);
      errOccurred = true;
      break;
  }

  await BackgroundTaskQueue.remove({ _id: chunk._id }).exec();
  if (!errOccurred) {
    // clear the task
    await BackgroundTaskQueue.remove({ _id: chunk._id }).exec();
    logger(`cleared task (${chunk._id})`);
  }

  // carry forward
  this.push(chunk);
  callback();
});
