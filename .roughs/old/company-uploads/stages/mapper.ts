import { Promise as BluePromise } from 'bluebird';
import { Transform } from 'stream';

import { countries as Countries } from '../../../models/countries';
import { specialities as Specialities } from '../../../models/specialities';
import { Context } from '../Context';

/**
 * pipe to map values as required to store to db
 * receives string[][] (row by row)
 */

export const mapper = (context: Context) => {
	return new Transform({
		writableObjectMode: true,
		readableObjectMode: true,
		async transform(chunk: string[] | any, enc, callback) {
			// thing gotten directly
			const name = chunk[0].trim();
			const type = 'distributor';
			const oldAumetLink = chunk[2];
			const websiteUrl = chunk[18];
			const comments = chunk[19];
			const address = chunk[20];
			const text = chunk[21];

			// mapping for indirect fields
			const countryId = await getCountryId(chunk[1].trim());

			// speciality mappings
			const specialityStrings: string[] = chunk.slice(3, 18);

			const specialityRaw: Array<{
				label: string;
				value: number;
				optionIcon: string;
			}> = await BluePromise.map(specialityStrings, async spec => {
				spec = spec.trim();
				if (!spec) {
					return null;
				}

				const dbResp: any = await Specialities.findOne({
					where: {
						speciality: spec,
					},
					raw: true,
				});

				if (!dbResp) {
					context.newErr(
						`INVALID SPECIALITY:(${spec})\n  in row [${chunk.toString()}]`,
					);
					return null;
				}

				return {
					label: spec,
					value: +dbResp.id,
					optionIcon: dbResp.iconImg,
				};
			});

			const speciality = specialityRaw.filter(val => val !== null);

			const companyData = {
				name,
				type,
				address,
				text,
				oldAumetLink,
				websiteUrl,
				comments,
				countryId,
				speciality,
				created_by_job_id: context.jobId,
			};

			this.push(companyData);
			callback();
		},
	});
};

/*
 * Following is the expected format
 * =================================
 * 0 Company Name
 * 1 Country
 * 2 old aumet link
 * 3 Speciality 1
 * 4 Speciality 2
 * 5 Speciality 3
 * 6 Speciality 4
 * 7 Speciality 5
 * 8 Speciality 6
 * 9 Speciality 7
 * 10 Speciality 8
 * 11 Speciality 9
 * 12 Speciality 10
 * 13 Speciality 11
 * 14 Speciality 12
 * 15 Speciality 13
 * 16 Specilaity 14
 * 17 Speciality 15
 * 18 website url
 * 19 Comments
 * 20 Company Address
 * 21 Text
 */

export async function getCountryId(country: string | number) {
	// adds type 'number' to suppress err
	const dbResp: any = await Countries.findOne({
		attributes: ['id'],
		where: {
			country,
		},
		raw: true,
	});

	if (dbResp && dbResp.id) {
		return +dbResp.id;
	} else {
		return null;
	}
}
