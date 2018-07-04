import { User } from '../models/User';

const consultant = {
  firstName: 'Tony',
  lastName: 'Stark',
  appliedRole: 'Consultant',
  email: 'stark@marvel.com',
  role: 'Consultant',
  password: 'password',
  mobile: '1111111',
};

export const initUsers = () => {
  const savable = new User(consultant);
  return savable.save();
};
