import { WorkerTask } from '../worker-task.type';
import { logger } from '../../worker/ipc-interface';

export const catTest: WorkerTask = async file => {
  logger('@cat-test file ' + file);
  return { successLog: [''], errLog: [''] };
};
