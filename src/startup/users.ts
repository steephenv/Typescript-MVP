import { User } from '../models/User';
import { TempUser } from '../models/TempUser';
import { Promise as BluePromise } from 'bluebird';

const consultant = {
  firstName: 'Tony',
  lastName: 'Stark',
  appliedRole: 'Consultant',
  email: 'stark@marvel.com',
  role: 'Consultant',
  password: 'password',
  mobile: '1111111',
};
const admin = {
  firstName: 'Red',
  lastName: 'Velvet',
  appliedRole: 'Admin',
  email: 'red@velvet.com',
  role: 'Admin',
  password: 'password',
  mobile: '1111111',
};
const dumUser1 = {
  firstName: 'Tony',
  lastName: 'Stark',
  appliedRole: 'Consultant',
  email: 'loki@marvel.com',
  role: 'Consultant',
  password: 'password',
  mobile: '1111111',
};
const temp1 = {
  firstName: 'Johny',
  lastName: 'Marvel',
  appliedRole: 'User',
  email: 'jo@marvel.com',
  token: 'dsfsdf',
  role: 'User',
  password: 'password',
  mobile: '545454',
  createdAt: new Date(),
};

export const initUsers = () => {
  const savableConsultant = new User(consultant);
  const savableDumUser1 = new User(dumUser1);
  const savableTemp = new TempUser(temp1);
  const savableAdmin = new User(admin);
  return BluePromise.all([
    savableConsultant.save(),
    savableDumUser1.save(),
    savableTemp.save(),
    savableAdmin.save(),
  ]);
};
