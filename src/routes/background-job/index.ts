import * as express from 'express';

export const backgroundJob = express.Router();

import { Tasks } from '../../background-worker/jobs/task-list';
import { enqueueTask } from '../../background-worker/enqueue-task';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

backgroundJob.post('/', async (req, res, next) => {
  const {
    file,
    functionName,
  }: { file: string; functionName: string } = req.body;

  let mappedFunctionName: string;

  switch (functionName) {
    case Tasks.CAT_TEST:
      mappedFunctionName = Tasks.CAT_TEST;
      break;

    default:
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, 'invalid function'),
      );
  }

  if (!file || !mappedFunctionName) {
    return next(
      new RequestError(
        RequestErrorType.BAD_REQUEST,
        'no file OR invalid function',
      ),
    );
  }

  // enqueue
  const taskId = await enqueueTask(
    { file, functionName: mappedFunctionName },
    true,
  );

  res.status(200).send({
    msg: 'your task queued',
    taskId,
  });
});
