// import { User } from '../models/User';

// import { Promise as BluePromise } from 'bluebird';

// const consultant = {
//   firstName: 'Tony',
//   lastName: 'Stark',
//   appliedRole: 'Consultant',
//   email: 'stark@marvel.com',
//   role: 'Consultant',
//   password: 'password',
//   mobile: '1111111',
// };
// const admin = {
//   firstName: 'Red',
//   lastName: 'Velvet',
//   appliedRole: 'Admin',
//   email: 'red@velvet.com',
//   role: 'Admin',
//   password: 'password',
//   mobile: '1111111',
// };
// const dumUser1 = {
//   firstName: 'Tony',
//   lastName: 'Stark',
//   appliedRole: 'Consultant',
//   email: 'loki@marvel.com',
//   role: 'Consultant',
//   password: 'password',
//   mobile: '1111111',
// };
// const temp1 = {
//   firstName: 'Johny',
//   lastName: 'Marvel',
//   appliedRole: 'User',
//   email: 'jo@marvel.com',
//   token: 'dsfsdf',
//   role: 'User',
//   password: 'password',
//   mobile: '545454',
//   createdAt: new Date(),
// };
// const newUserBPM = new User({
//   firstName: 'Martin',
//   lastName: 'Luther',
//   email: 'mvp@marvel.com',
//   password: '123456',
//   role: 'BPM',
//   appliedRole: 'BPM',
//   mobile: '4554543',
// });

// const newUserClient1 = new User({
//   firstName: 'Bernad',
//   lastName: 'Shah',
//   email: 'miwagoclient1@yopmail.com',
//   password: '123456',
//   role: 'Client',
//   appliedRole: 'Client',
//   mobile: '4554543',
//   companyName: 'Marvel',
// });

// const newUserClient2 = new User({
//   firstName: 'Mayavi',
//   lastName: 'Shah',
//   email: 'miwagoclient2@yopmail.com',
//   password: '123456',
//   role: 'Client',
//   appliedRole: 'Client',
//   mobile: '4554543',
//   companyName: 'Client-Company',
// });

// const dumConsul1 = new User({
//   firstName: 'Shikkari',
//   lastName: 'Shambu',
//   appliedRole: 'Consultant',
//   email: 'shikkari@yopmail.com',
//   role: 'Consultant',
//   password: 'password',
//   mobile: '1111111',
// });

// const dumConsul2 = new User({
//   firstName: 'Shuppandi',
//   lastName: 'Shambu',
//   appliedRole: 'Consultant',
//   email: 'shuppandi@yopmail.com',
//   role: 'Consultant',
//   password: 'password',
//   mobile: '1111111',
// });

// export const initUsers = async () => {
//   const savableConsultant = new User(consultant);
//   const savableDumUser1 = new User(dumUser1);
//   const savableAdmin = new User(admin);
//   const savableClient1 = new User(newUserClient1);
//   const savableClient2 = new User(newUserClient2);

//   await BluePromise.all([
//     savableConsultant.save(),
//     savableDumUser1.save(),
//     savableAdmin.save(),
//     newUserBPM.save(),
//     savableClient1.save(),
//     savableClient2.save(),
//   ]);
// };
