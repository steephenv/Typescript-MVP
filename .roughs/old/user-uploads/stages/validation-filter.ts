import { Transform } from 'stream';
import { Context } from '../Context';

/**
 * stream receives row by row
 * count number of tabs in each line and verify they are equal
 */

interface IValidationOptions {
	necessaryFieldsPositions: number[];
	context: Context;
	header: string[];
}

export const validationFilter = (options: IValidationOptions) => {
	let headerVerified = false;
	let thisIsFirstChunk = true;

	return new Transform({
		readableObjectMode: true,
		writableObjectMode: true,
		transform(chunk, encoding, callback) {
			// handle new line
			if (chunk.length === 1 && chunk[0] === '') {
				return callback();
			}

			if (chunk.length !== options.header.length) {
				options.context.newErr(
					`COLUMN MISSING: expected(${
						options.header.length
					}), received(${
						chunk.length
					})\n  in row [${chunk.toString()}]`,
				);
				return callback();
			}

			// verify and skip header
			if (thisIsFirstChunk) {
				let headerCorrect = true;
				// tslint:disable-next-line:prefer-for-of
				for (let i = 0; i < options.header.length; i++) {
					const chunkRef: any = chunk[i];

					if (
						chunkRef.trim().toLowerCase() !==
						options.header[i].trim().toLowerCase()
					) {
						options.context.headerMismatch = true;
						headerCorrect = false;
						options.context.newErr(
							`HEADER MISMATCH: expected(${
								options.header[i]
							}), received(${
								chunk[i]
							})\n    at header position (${i + 1})`,
						);
						break;
					}
				}
				if (headerCorrect) {
					headerVerified = true;
				}
				thisIsFirstChunk = false;
				return callback();
			}

			if (!headerVerified) {
				return callback();
			}

			const necessaryFieldsErrs: number[] = [];

			options.necessaryFieldsPositions.forEach(i => {
				if (
					chunk[i] === null ||
					chunk[i] === undefined ||
					chunk[i] === ''
				) {
					necessaryFieldsErrs.push(i + 1);
				}
			});

			if (necessaryFieldsErrs.length) {
				options.context.newErr(
					`FIELDS MISSING in positions: [${necessaryFieldsErrs.join(
						', ',
					)}]\n  of row: [${chunk.toString()}]`,
				);
				return callback();
			}
			this.push(chunk);
			callback();
		},
	});
};
