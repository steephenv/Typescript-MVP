import { user as Users } from '../../../models/user';

interface IUserOptions {
	companyId: number;
	countryId: number;

	firstName: string;
	lastName: string;
	email: string;
	jobTitle: string;
	countryCode: string;
	phone: string;
	isAdmin: boolean;
	userType: 'distributor' | 'manufacturer';
	createdByJobId: string;
}

export class User {
	public firstName: string;
	public lastName: string;
	public email: string;
	public jobTitle: string;
	public countryCode: string;
	public personalPhoneWithCode: string;
	public userType: string;
	public isCompanyAdmin: boolean;
	public existingUser: boolean;
	public companyId: number;
	public createdByJobId: string;

	constructor(details: IUserOptions) {
		this.firstName = details.firstName;
		this.lastName = details.lastName;
		this.email = details.email;
		this.jobTitle = details.jobTitle;
		this.countryCode = details.countryCode;
		this.personalPhoneWithCode = details.phone;
		this.userType = details.userType;
		this.isCompanyAdmin = true;
		this.existingUser = true;
		this.companyId = details.companyId;
		this.createdByJobId = details.createdByJobId;
	}

	public async isDuplicate() {
		const users = await Users.findAll({
			where: {
				email: this.email,
			},
			raw: true,
		});
		if (users.length) {
			return true;
		}
		return false;
	}

	public async save() {
		await Users.create({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			jobTitle: this.jobTitle,
			countryCode: this.countryCode,
			personalPhoneWithCode: this.personalPhoneWithCode,
			userType: this.userType,
			isCompanyAdmin: this.isCompanyAdmin,
			existingUser: this.existingUser,
			companyId: this.companyId,
			created_by_job_Id: this.createdByJobId,
		});
	}
}
