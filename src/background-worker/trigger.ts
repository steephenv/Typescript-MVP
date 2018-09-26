/**
 * this file is called inside the app.
 * starts the background worker
 */

import { spawn } from 'child_process';
import * as log from 'fancy-log';
import { join as pathJoin } from 'path';

import { isWorkerRunning } from './is-worker-running';
import { startListener } from './ipc-listener';

const WORKER_LOC = pathJoin(
  __dirname,
  process.env.TESTING === 'true' ? 'worker/index.ts' : 'worker/index.js',
);

const NODE_PROCESS = process.env.TESTING === 'true' ? 'ts-node' : 'node';

// start ipc-listener
startListener();

export async function triggerBackgroundWorker() {
  log('trigger for background worker found');

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
  });

  // dispatch
  worker.unref();

  log(`background-worker (${worker.pid}) triggered`);

  return 'worker-just-started';
}
