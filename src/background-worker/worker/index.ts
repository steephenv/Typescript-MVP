import { mongooseConnectionPromise } from '../../db.init';
import { BackgroundTaskQueue } from '../../models/BackgroundTaskQueue';
import { functionApplier } from './task-applier.transform-stream';
import { logger } from './ipc-interface';

async function startWorker() {
  await mongooseConnectionPromise;

  const taskStream = BackgroundTaskQueue.find({})
    .sort({ createdAt: 1 })
    .cursor();

  taskStream
    .pipe(functionApplier)
    .on('data', (data: any) => {
      logger('[from on ] ' + data.key + '=' + data.value);
    })
    .on('error', (err: any) => {
      logger('[from on ] Oh my!' + err);
    })
    .on('close', () => {
      logger('[from on ] Stream closed');
    })
    .on('end', () => {
      logger('[from on ] Stream ended');
      // process.exit(0);
    });
}

startWorker();

setInterval(() => logger('[pulse] <3'), 1000);

setTimeout(() => process.exit(0), 5000);
