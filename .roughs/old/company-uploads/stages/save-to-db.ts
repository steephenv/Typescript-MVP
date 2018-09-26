import * as stringify from 'json-stringify-pretty-compact';
import { Writable } from 'stream';

import { company as Company } from '../../../models/company';
import { Context } from '../Context';

export const saveToDb = (ctx: Context) => {
	return new Writable({
		objectMode: true,
		async write(chunk, enc, callback) {
			try {
				await Company.create(chunk);
				ctx.log(`✔ saving ${stringify(chunk, { maxLength: 1000 })}`);
			} catch (err) {
				ctx.newErr(err);
				ctx.exceptionFlush(err);
			}
			return callback();
		},
	});
};
