// tslint:disable:no-console

import * as ipc from 'node-ipc';

const responder = () => {
	const loggerFunction = { value: (msg: string) => console.log(msg) };

	ipc.config.id = 'AUMET_COMPANY_UPLOAD_JOB';
	ipc.config.retry = 1500;
	ipc.config.silent = true;

	ipc.connectTo('AUMET_MAIN_PROCESS', () => {
		ipc.of.AUMET_MAIN_PROCESS.on('connect', () => {
			ipc.of.AUMET_MAIN_PROCESS.emit(
				'job-log',
				`@COMPANY_UPLOAD_JOB (${process.pid}) connected`,
			);
			loggerFunction.value = (msg: string) => {
				ipc.of.AUMET_MAIN_PROCESS.emit(
					'job-log',
					`@COMPANY_UPLOAD_JOB (${process.pid}): ${msg}`,
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
