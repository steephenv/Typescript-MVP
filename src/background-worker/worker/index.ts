import { logger } from './ipc-interface';

setTimeout(() => {
  process.exit(0);
}, 15000);

setInterval(() => {
  logger('ooy');
}, 800);
