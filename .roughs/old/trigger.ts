// tslint:disable:no-console

import { spawn } from 'child_process';

import { join } from 'path';
import { isJobRunning } from './is-running';
import { startListener } from './log-listener';

if (process.env.NODE_APP_INSTANCE !== 'test') {
	startListener();
}

export const companyUpload = async () => {
	console.log('\n\ntrigger for company upload found');
	const isRunning = await isJobRunning('COMPANY_UPLOAD');
	if (isRunning) {
		console.log('job is already running\n\n');
		return 'job-running';
	} else {
		console.log('no-upload-company-job running. attempting to create new');
		const cmd = process.env.TS_DEBUGGING ? 'ts-node' : 'node';
		const targetPath = process.env.TS_DEBUGGING
			? 'company-uploads/index.ts'
			: 'company-uploads/index.js';

		const joinedPath = join(__dirname, targetPath);

		console.log(`>>> spawning # ${cmd}, ${joinedPath}`);

		// launch process
		const job = spawn(cmd, [joinedPath], {
			detached: true,
			stdio: 'ignore',
			env: process.env,
		});
		// dispatch
		job.unref();

		console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
		console.log(
			`>>>>>> COMPANY_UPLOAD_JOB ( ${job.pid} ) triggered <<<<<<<`,
		);
		console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

		return 'job-just-started';
	}
};

export const userUpload = async () => {
	console.log('\n\ntrigger for user upload found');
	const isRunning = await isJobRunning('USER_UPLOAD');
	if (isRunning) {
		console.log('job is already running\n\n');
		return 'job-running';
	} else {
		console.log('no-user-upload-job running. attempting to create new');
		const cmd = process.env.TS_DEBUGGING ? 'ts-node' : 'node';
		const targetPath = process.env.TS_DEBUGGING
			? 'user-uploads/index.ts'
			: 'user-uploads/index.js';

		const joinedPath = join(__dirname, targetPath);

		console.log(`>>> spawning # ${cmd}, ${joinedPath}`);

		// launch process
		const job = spawn(cmd, [joinedPath], {
			detached: true,
			stdio: 'ignore',
			env: process.env,
		});
		// dispatch
		job.unref();

		console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
		console.log(`>>>>>> USER_UPLOAD_JOB ( ${job.pid} ) triggered <<<<<<<`);
		console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

		return 'job-just-started';
	}
};
