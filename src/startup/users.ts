import { User } from '../models/User';
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
const dumUser1 = {
  firstName: 'Tony',
  lastName: 'Stark',
  appliedRole: 'Consultant',
  email: 'loki@marvel.com',
  role: 'Consultant',
  password: 'password',
  mobile: '1111111',
};

export const initUsers = () => {
  const savableConsultant = new User(consultant);
  const savableDumUser1 = new User(dumUser1);
  return BluePromise.all([savableConsultant.save(), savableDumUser1.save()]);
};
