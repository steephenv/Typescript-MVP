import { Transform } from 'stream';

import { Context } from '../Context';
import { User } from './User';

import { company as Company } from '../../../models/company';
import { countries as Countries } from '../../../models/countries';

/**
 * receives validated chunk(line) like string[]
 */
export const userWiseSplitter = (ctx: Context) => {
	return new Transform({
		readableObjectMode: true,
		writableObjectMode: true,
		async transform(chunk: any, encoding, callback) {
			const countryName: string = chunk[1];
			const countryId: number = await mapCountryId(countryName);
			if (!countryId) {
				ctx.newErr(
					`INVALID COUNTRY: (${countryName}) does not exist in database.\n    at row [${chunk.join(
						', ',
					)}]`,
				);
				return callback();
			}

			const companyName: string = chunk[0];
			const { companyId, companyType } = await mapCompanyId(
				companyName,
				countryId,
			);
			if (!companyId) {
				ctx.newErr(
					`INVALID COMPANY: (${companyName}) does not exist in database.\n    at row [${chunk.join(
						', ',
					)}]`,
				);
				return callback();
			}

			// split users
			const splittedUsers = splitUsers(chunk);
			// make users
			const users = parseUsers(
				splittedUsers,
				companyId,
				countryId,
				companyType,
				ctx.jobId,
			);

			const filteredUsers = users.filter(u => u !== null);

			filteredUsers.forEach(user => {
				this.push(user);
			});

			return callback();
		},
	});
};

async function mapCountryId(countryName: string) {
	const resp: any = await Countries.findOne({
		attributes: ['id'],
		where: {
			country: countryName,
		},
		raw: true,
	});

	if (!resp) {
		return null;
	}
	return resp.id;
}

async function mapCompanyId(name: string, countryId: number) {
	const resp: any = await Company.findOne({
		attributes: ['id', 'type'],
		where: {
			name,
			countryId,
		},
		raw: true,
	});

	if (!resp) {
		return null;
	}
	return { companyId: +resp.id, companyType: resp.type };
}

function splitUsers(chunk: string[]) {
	const user1 = chunk.slice(2, 8);
	const user2 = chunk.slice(8, 14);
	const user3 = chunk.slice(14, 20);
	const user4 = chunk.slice(20, 26);

	return [user1, user2, user3, user4];
}

function parseUsers(
	users: string[][],
	companyId: number,
	countryId: number,
	userType: 'distributor' | 'manufacturer',
	createdByJobId: string,
) {
	const userObjs = users.map((user, i) => {
		let isAdmin;
		if (!user[0] || !user[2]) {
			return null;
		}
		if (i === 0) {
			isAdmin = true;
		} else {
			isAdmin = false;
		}

		return new User({
			firstName: user[0],
			lastName: user[1],
			email: user[2],
			jobTitle: user[3],
			countryCode: user[4],
			phone: user[5],
			companyId,
			countryId,
			isAdmin,
			userType,
			createdByJobId,
		});
	});

	return userObjs;
}
