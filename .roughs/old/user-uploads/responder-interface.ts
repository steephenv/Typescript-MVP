// tslint:disable:no-console

import * as ipc from 'node-ipc';

const responder = () => {
	const loggerFunction = { value: (msg: string) => console.log(msg) };

	ipc.config.id = 'USER_UPLOAD';
	ipc.config.retry = 1500;
	ipc.config.silent = true;

	ipc.connectTo('AUMET_MAIN_PROCESS', () => {
		ipc.of.AUMET_MAIN_PROCESS.on('connect', () => {
			ipc.of.AUMET_MAIN_PROCESS.emit(
				'job-log',
				`@USER_UPLOAD (${process.pid}) connected`,
			);
			loggerFunction.value = (msg: string) => {
				ipc.of.AUMET_MAIN_PROCESS.emit(
					'job-log',
					`@USER_UPLOAD (${process.pid}): ${msg}`,
				);
				console.log(msg);
			};
		});
	});

	return (msg: string) => {
		loggerFunction.value(msg);
	};
};

export const logger = responder();
