import { put } from '../leveldb';
import { triggerBackgroundWorker } from './trigger';

export async function enqueueTask(
  file: string,
  functionName: 'test' | 'test2',
  jobCategory: 'CSV-UPLOAD',
  trigger = false,
  category = 'JOB',
) {
  await put(file, {
    category,
    jobCategory,
    file,
    functionName,
  });

  if (trigger) {
    return await triggerBackgroundWorker();
  }
  return 'done';
}
