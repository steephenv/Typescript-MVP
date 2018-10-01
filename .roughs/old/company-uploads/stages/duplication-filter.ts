import { Transform } from 'stream';

import { company as Companies } from '../../../models/company';

import { Context } from '../Context';
import { getCountryId } from './mapper';

/**
 * stream receives row by row
 * check against db if the company is there
 */

export const duplicationFilter = (context: Context) => {
	return new Transform({
		readableObjectMode: true,
		writableObjectMode: true,
		async transform(chunk, encoding, callback) {
			const companyName = chunk[0];
			const country: any = chunk[1];
			const countryId = await getCountryId(country.trim());

			if (!countryId) {
				context.newErr(
					`INVALID COUNTRY:(${country})\n  in row: [${chunk}]`,
				);
				return callback();
			}
			const dbResp = await Companies.findAll({
				where: {
					name: companyName,
					countryId,
				},
				raw: true,
			});

			if (dbResp.length) {
				context.log(
					`❌ DUPLICATION FOUND for [${companyName}] in [${country}]:\n    at row: [${chunk}]\n    hence skipping`,
				);
				return callback();
			}

			this.push(chunk);
			return callback();
		},
	});
};
