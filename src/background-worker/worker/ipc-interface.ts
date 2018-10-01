import * as ipc from 'node-ipc';
import * as log from 'fancy-log';

const responder = () => {
  // for var ref
  const loggerFunction = {
    value: (msg: string) => {
      log(msg);
    },
  };

  ipc.config.id = 'MIWAGO_WORKER';
  ipc.config.retry = 1500;
  ipc.config.silent = true;

  ipc.connectTo('MIWAGO_MAIN_PROCESS', () => {
    ipc.of.MIWAGO_MAIN_PROCESS.on('connect', () => {
      ipc.of.MIWAGO_MAIN_PROCESS.emit('log', `@BW (${process.pid}) connected`);
      loggerFunction.value = (msg: string) => {
        ipc.of.MIWAGO_MAIN_PROCESS.emit('log', `@BW (${process.pid}): ${msg}`);
        log(msg);
      };
    });
  });

  return (msg: string) => {
    loggerFunction.value(msg);
  };
};

export const logger = responder();
