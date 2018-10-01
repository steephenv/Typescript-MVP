// tslint:disable:no-console

import { Promise as BluePromise } from 'bluebird';

import { Context } from './Context';
import { logger } from './responder-interface';

import {
	duplicationFilter,
	mapper,
	tsvArraySplitter,
	validationFilter,
} from './stages';

const header = [
	'Company Name',
	'Country',
	'old aumet link',
	'Speciality 1',
	'Speciality 2',
	'Speciality 3',
	'Speciality 4',
	'Speciality 5',
	'Speciality 6',
	'Speciality 7',
	'Speciality 8',
	'Speciality 9',
	'Speciality 10',
	'Speciality 11',
	'Speciality 12',
	'Speciality 13',
	'Speciality 14',
	'Speciality 15',
	'website url',
	'Comments',
	'Company Address',
	'Text',
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
			.pipe(duplicationFilter(ctx))
			.on('error', err => logger('err in duplicationFilter' + err))
			.pipe(mapper(ctx))
			.on('error', err => logger('err in mapper' + err))
			.pipe(ctx.saveToDb)
			.on('error', err => logger('err in ctx.saveToDb' + err));
	});
}

logger(`launching upload job >>`);
launch();
