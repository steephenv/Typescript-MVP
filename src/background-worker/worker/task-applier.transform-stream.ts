import { obj as ThroughObjectStream } from 'through2';
import { logger } from './ipc-interface';
import { BackgroundTaskQueue } from '../../models/BackgroundTaskQueue';
import { Tasks } from '../jobs/task-list';

// tasks
import { catTest } from '../jobs/cat-test';

interface IDBTask {
  functionName: string;
  file: string;
  _id: string;
}

export const functionApplier = ThroughObjectStream(async function(
  chunk: IDBTask,
  enc,
  callback,
) {
  const taskLogHandler = makeTaskFnLogHandler(chunk);
  await updateTaskStatusAsRunning(chunk);

  // task-selector
  switch (chunk.functionName) {
    case Tasks.CAT_TEST:
      await taskLogHandler(await catTest(chunk.file));
      break;
    default:
      logger(`unknown function ${chunk.functionName} found (${chunk._id})`);
      await taskLogHandler({
        successLog: [],
        errLog: [
          'INTERNAL ERROR',
          `unknown function ${chunk.functionName} found (${chunk._id}`,
        ],
      });
      break;
  }

  // carry forward
  this.push(chunk);
  callback();
});

function makeTaskFnLogHandler(task: IDBTask) {
  return async ({
    successLog = [],
    errLog = [],
  }: {
    successLog: string[];
    errLog: string[];
  }) => {
    await BackgroundTaskQueue.update(
      { _id: task._id },
      {
        successLog: successLog.join('\n'),
        errLog: errLog.join('\n'),
        ran: true,
        status: errLog.length ? 'failed' : 'passed',
      },
    ).exec();
  };
}

async function updateTaskStatusAsRunning(task: IDBTask) {
  logger(`task:${task.functionName} (${task._id})`);

  await BackgroundTaskQueue.update(
    { _id: task._id },
    {
      status: 'running',
    },
  ).exec();
}
