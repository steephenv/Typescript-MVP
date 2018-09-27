/**
 * this file is called inside the app.
 * starts the background worker
 */

import { spawn } from 'child_process';
import * as log from 'fancy-log';
import { join as pathJoin } from 'path';
import { enqueueTask } from './enqueue-task';
import { isWorkerRunning } from './is-worker-running';
import { startListener } from './ipc-listener';
import { Tasks } from './jobs/task-list';

const WORKER_LOC = pathJoin(
  __dirname,
  process.env.TESTING === 'true' ? 'worker/index.ts' : 'worker/index.js',
);

const NODE_PROCESS = process.env.TESTING === 'true' ? 'ts-node' : 'node';

// start ipc-listener
startListener();

export async function triggerBackgroundWorker(withDummy = false) {
  log('trigger for background worker found');

  if (withDummy) {
    log('adding dummy task');
    await enqueueTask(
      { functionName: Tasks.CAT_TEST, file: 'cat-file' },
      false, // must be false else this will be recursive
    );
  }
  // check if worker already running
  if (await isWorkerRunning()) {
    log('worker already running');
    return 'worker already running';
  }

  // no worker running. start it
  const worker = spawn(NODE_PROCESS, [WORKER_LOC], {
    detached: true,
    stdio: 'ignore',
    env: process.env,
    cwd: process.cwd(),
  });

  // dispatch
  worker.unref();

  log(`background-worker (${worker.pid}) triggered`);

  return 'worker-just-started';
}
