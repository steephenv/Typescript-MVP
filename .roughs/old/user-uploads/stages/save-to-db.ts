import * as stringify from 'json-stringify-pretty-compact';
import { Writable } from 'stream';

import { Context } from '../Context';
import { User } from './User';

export const saveToDb = (ctx: Context) => {
	return new Writable({
		objectMode: true,
		async write(chunk: any, enc, callback) {
			const user: User = chunk;
			try {
				const isDuplicate = await user.isDuplicate();

				if (isDuplicate) {
					ctx.log(
						`❌ DUPLICATION FOUND for [${
							user.email
						}]:\n    at row: [${stringify(chunk, {
							maxLength: 1000,
						})}]\n    hence skipping`,
					);
					return callback();
				}
				ctx.log(`✔ saving ${stringify(chunk, { maxLength: 1000 })}`);
				await user.save();
			} catch (err) {
				ctx.newErr(err);
				ctx.exceptionFlush(err);
			}
			return callback();
		},
	});
};
