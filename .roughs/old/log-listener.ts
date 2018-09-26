// tslint:disable:no-console
import * as ipc from 'node-ipc';

const maxRetries: any = 20;
ipc.config.id = 'AUMET_MAIN_PROCESS';
ipc.config.retry = 1500;
ipc.config.maxRetries = maxRetries;

ipc.config.silent = true;

export const startListener = () => {
	console.log('\n>>> starting ipc listener');
	ipc.serve(() =>
		ipc.server.on('job-log', (message: string) => {
			// strip new lines
			console.log(`@JOB ${message}`);
		}),
	);
	ipc.server.start();
};
