import * as userHome from 'user-home';

import { BackgroundTaskQueue as BackgroundTask } from '../models/BackgroundTaskQueue';
import { triggerBackgroundWorker } from './trigger';

interface IEnqueueTaskParams {
  functionName: string; // name of the function to apply
  file: string; // other details
}

export async function enqueueTask(params: IEnqueueTaskParams, trigger = true) {
  const data = Object.assign({}, params, {
    createdAt: new Date(),
    machineId: userHome,
    ran: false,
    status: 'queued',
  });

  const newTask = new BackgroundTask(data);

  await newTask.save();

  if (trigger) {
    return await triggerBackgroundWorker();
  }
  return newTask._id;
}
