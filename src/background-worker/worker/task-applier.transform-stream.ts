import { obj as ThroughObjectStream } from 'through2';
import { logger } from './ipc-interface';

export const functionApplier = ThroughObjectStream(function(
  chunk,
  enc,
  callback,
) {
  logger('----\n' + JSON.stringify(chunk));
  this.push(chunk);
  callback();
});
