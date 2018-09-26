// tslint:disable:no-console
import * as ipc from 'node-ipc';
import * as log from 'fancy-log';

const maxRetries: any = 20;
ipc.config.id = 'MIWAGO_MAIN_PROCESS';
ipc.config.retry = 1500;
ipc.config.maxRetries = maxRetries;

ipc.config.silent = true;

export const startListener = () => {
  log('starting ipc listener');
  ipc.serve(() =>
    ipc.server.on('log', (message: string) => {
      // strip new lines
      log(`@JOB ${message}`);
    }),
  );
  ipc.server.start();
};
