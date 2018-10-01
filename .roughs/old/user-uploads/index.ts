// tslint:disable:no-console

import { Promise as BluePromise } from 'bluebird';

import { Context } from './Context';
import { logger } from './responder-interface';

import { tsvArraySplitter, userWiseSplitter, validationFilter } from './stages';

const header = [
	'Company name',
	'Country',
	// 2 - 8
	'First Name',
	'Last Name',
	'Email 1',
	'Job title 1',
	'Country code 1',
	'Mobile 1',
	// 8 - 14
	'First Name 2',
	'Last Name 2',
	'Email 2',
	'Job title 2',
	'Country code 2',
	'Mobile 2',
	// 14 - 20
	'First Name 3',
	'Last Name 3',
	'Email 3',
	'Job title 3',
	'Country code 3',
	'Mobile 3',
	// 20 - 26
	'First Name 4',
	'Last Name 4',
	'Email 4',
	'Job title 4',
	'Country code 4',
	'Mobile 4',
];
// listen for pinging

const startPipeline = async () => {
	try {
		// logger(`context initiating`);
		const ctx = new Context();
		await ctx.init();

		process.addListener('uncaughtException', ctx.exceptionFlush);
		process.addListener('unhandledRejection', ctx.exceptionFlush);
		process.addListener('SIGINT', ctx.exceptionFlush);

		await pipeline(ctx);

		process.removeListener('uncaughtException', ctx.exceptionFlush);
		process.removeListener('unhandledRejection', ctx.exceptionFlush);
		process.removeListener('SIGINT', ctx.exceptionFlush);

		return;
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

async function launch() {
	let trip = 1;

	while (true) {
		logger(`trip: ${trip}`);
		await startPipeline();
		trip++;
	}
}

function pipeline(ctx: Context) {
	return new BluePromise(resolve => {
		ctx.resolver = resolve;
		// logger(`starting pipeline`);
		ctx.read
			.pipe(tsvArraySplitter())
			.on('error', err => logger('err in tsvArraySplitter' + err))
			.pipe(
				validationFilter({
					header,
					context: ctx,
					necessaryFieldsPositions: [0, 1],
				}),
			)
			.on('error', err => logger('err in validationFilter' + err))
			.pipe(userWiseSplitter(ctx))
			.on('error', err => logger('err in userWiseSplitter' + err))
			.pipe(ctx.saveToDb)
			.on('error', err => logger('err in ctx.saveToDb' + err));
	});
}

logger(`launching user upload job >>`);
launch();
