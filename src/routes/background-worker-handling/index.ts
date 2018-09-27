import * as express from 'express';

export const workerHandler = express.Router();

import { isWorkerRunning } from '../../background-worker/is-worker-running';
import { triggerBackgroundWorker } from '../../background-worker/trigger';

workerHandler.get('/', (req, res) => {
  res.status(200).send(`<code>
    /is-running => status
    /trigger    => trigger
  </code>`);
});

workerHandler.get('/is-running', async (req, res) => {
  res.status(200).send({
    result: await isWorkerRunning(),
  });
});

workerHandler.get('/trigger', async (req, res) => {
  res.status(200).send({
    result: await triggerBackgroundWorker(true),
  });
});
