// tslint:disable:no-console

import { Promise as BluePromise, promisify } from 'bluebird';
import {
	createReadStream,
	createWriteStream,
	readdir as _readdir,
	unlink as _unlink,
} from 'fs';
import { join } from 'path';
import { generate as generateId } from 'shortid';
import { Readable, Writable } from 'stream';
import * as userHome from 'user-home';
import { bulkUpload as Bulk } from '../../models/bulk-upload';

import { logger } from './responder-interface';

import { s3Upload } from './s3-upload';
import { saveToDb } from './stages';

const readdir = promisify(_readdir);
const unlink = promisify(_unlink);

export const TEMP_BLOB_LOCATION = join(userHome, 'temp', 'users');

export class Context {
	public read: Readable;
	public saveToDb: Writable;
	public jobId: string;
	public pureFileName: string;
	public headerMismatch: boolean;

	private sourceTsvFile: string;
	private errFile: string;
	private logFile: string;
	private errFileStream: Writable;
	private logFileStream: Writable;
	private errCount: number;
	private logCount: number;
	private resolve: any;

	constructor() {
		this.jobId = generateId();
	}

	/**
	 * function to set source tsv file
	 *
	 */
	public async init() {
		try {
			const {
				sourceTsvFile,
				errFile,
				logFile,
				pureFileName,
			} = await this.nextFileToProcess();

			this.sourceTsvFile = sourceTsvFile;
			this.errFile = errFile;
			this.logFile = logFile;
			this.pureFileName = pureFileName;

			this.errCount = 0;
			this.logCount = 0;

			this.read = createReadStream(this.sourceTsvFile);
			this.saveToDb = saveToDb(this);
			this.errFileStream = createWriteStream(this.errFile);
			this.logFileStream = createWriteStream(this.logFile);

			this.saveToDb.on('finish', async () => {
				await this.flush();
				this.saveToDb.end();
				// logger('pipe-finished');
				this.resolve();
			});

			await Bulk.update(
				{
					status: 'running',
					job_id: this.jobId,
				},
				{
					where: {
						file_name: this.sourceTsvFile,
					},
				},
			);
		} catch (err) {
			// tslint:disable-next-line
			logger(err + '');
			this.exceptionFlush();
		}
	}

	/**
	 * fn to store errs
	 */
	public newErr(err: string) {
		this.errCount++;
		this.errFileStream.write('❌ ' + err + '\n\n', 'utf8');
	}

	public log(msg: string) {
		this.logCount++;
		this.logFileStream.write(msg + '\n', 'utf8');
	}

	public set resolver(resolver: any) {
		this.resolve = resolver;
	}
	/**
	 * call when an exception occurs
	 */
	public async exceptionFlush(err?: any) {
		console.error(err);

		logger('exception flush called');
		this.errFileStream.end();
		this.logFileStream.end();

		try {
			await BluePromise.all([unlink(this.errFile), unlink(this.logFile)]);
		} catch (err) {
			// logger('err/log file already deleted. hence skipping');
		}
		// closeDbsGracefully();
		process.exit(1);
	}

	/**
	 * function to end the context. it returns err count
	 */
	private async flush() {
		try {
			this.log(
				`\n\n# db connection closed gracefully.\n# doing post process functions..`,
			);

			// end err,log stream
			this.errFileStream.end();
			this.logFileStream.end();

			// logger('flush called');

			let errUploadPromise;
			let logUploadPromise;

			if (this.logCount) {
				// save log to s3
				logUploadPromise = s3Upload(
					this.pureFileName + '_logs.txt',
					this.logFile,
				);
			}

			if (this.errCount) {
				// save err log to s3
				errUploadPromise = s3Upload(
					this.pureFileName + '_errs.txt',
					this.errFile,
				);
			}

			const [logAccessUrl, errAccessUrl] = await BluePromise.all([
				logUploadPromise,
				errUploadPromise,
			]);

			let status = 'passed';
			if (this.errCount) {
				status = 'partially-failed';
			}
			if (this.headerMismatch) {
				status = 'failed';
			}

			// save accessUrls to database
			const updateResp = await Bulk.update(
				{
					error_log: errAccessUrl,
					success_log: logAccessUrl,
					status,
				},
				{
					where: {
						file_name: this.pureFileName,
					},
				},
			);
			if (!updateResp[0]) {
				await Bulk.create({
					error_log: errAccessUrl,
					success_log: logAccessUrl,
					status: this.errCount ? 'partially-failed' : 'passed',
					file_name: this.pureFileName,
					job_id: this.jobId,
				});
			}

			// closeDbsGracefully();
			try {
				await BluePromise.all([
					unlink(this.errFile),
					unlink(this.logFile),
					unlink(this.sourceTsvFile),
				]);
			} catch (err) {
				logger(`err/log/src files already deleted. hence skipping`);
			}
		} catch (err) {
			// tslint:disable-next-line
			logger(err + '');
			this.exceptionFlush();
		}
	}

	/**
	 * Function to return next file to be parsed.
	 * Each time this fn calls, returns newly fetched data
	 */
	private async nextFileToProcess() {
		let rawFiles = await readdir(TEMP_BLOB_LOCATION);

		// strip out .gitkeep
		const files = rawFiles.filter(val => val !== 'workspace');

		// help garbageCollection
		rawFiles = null;

		if (files[0]) {
			logger(`file-selected: ${files[0]}`);
			return {
				sourceTsvFile: join(TEMP_BLOB_LOCATION, files[0]),
				errFile: join(
					TEMP_BLOB_LOCATION,
					'workspace',
					files[0] + '_errs.txt',
				),
				logFile: join(
					TEMP_BLOB_LOCATION,
					'workspace',
					files[0] + '_logs.txt',
				),
				pureFileName: files[0],
			};
		} else {
			logger('no more files found hence terminating :)');
			return process.exit(0);
		}
	}
}
