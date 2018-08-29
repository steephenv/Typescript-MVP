import { User } from '../models/User';
import { TempUser } from '../models/TempUser';
import { EmployeeProjects } from '../models/EmployeeProjects';
import { Experience } from '../models/Experience';
import { Skills } from '../models/Skills';
import { InterviewAvailabilityCalender } from '../models/InterviewAvailabilityCalender';
import { Industry } from '../models/Industries';
import { Project } from '../models/Project';

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
const newUserBPM = new User({
  firstName: 'Martin',
  lastName: 'Luther',
  email: 'mvp@marvel.com',
  password: '123456',
  role: 'BPM',
  appliedRole: 'BPM',
  mobile: '4554543',
});

const newUserClient1 = new User({
  firstName: 'Bernad',
  lastName: 'Shah',
  email: 'miwagoclient1@yopmail.com',
  password: '123456',
  role: 'Client',
  appliedRole: 'Client',
  mobile: '4554543',
  companyName: 'Marvel',
});

const newUserClient2 = new User({
  firstName: 'Mayavi',
  lastName: 'Shah',
  email: 'miwagoclient2@yopmail.com',
  password: '123456',
  role: 'Client',
  appliedRole: 'Client',
  mobile: '4554543',
  companyName: 'Client-Company',
});

const dumConsul1 = new User({
  firstName: 'Shikkari',
  lastName: 'Shambu',
  appliedRole: 'Consultant',
  email: 'shikkari@yopmail.com',
  role: 'Consultant',
  password: 'password',
  mobile: '1111111',
});

const dumConsul2 = new User({
  firstName: 'Shuppandi',
  lastName: 'Shambu',
  appliedRole: 'Consultant',
  email: 'shuppandi@yopmail.com',
  role: 'Consultant',
  password: 'password',
  mobile: '1111111',
});

const industrySave = new Industry({
  name: 'Comic Movies',
});

const saveConsultant1Details = async (client: any) => {
  const client1Exp = new Experience({
    userId: client._id,
    companyName: 'Marvel',
    companyIndustryLine: 'Comic Movies',
  });
  const client1Proj = new EmployeeProjects({
    userId: client._id,
    clientsCompanyName: 'Marvel',
    projectName: 'Iron Man Series',
  });
  const client1Skill = new Skills({
    userId: client._id,
    skillTitle: 'Genius',
    uniqueTitle: 'genius123',
    proficiency: 'great',
  });
  const client1Avail1 = new InterviewAvailabilityCalender({
    userId: client._id,
    booked: false,
    slotDayStartingTime: new Date(2018, 11, 10, 9),
    startTime: new Date(2018, 11, 10, 10),
    endTime: new Date(2018, 11, 10, 11),
  });
  const client1Avail2 = new InterviewAvailabilityCalender({
    userId: client._id,
    booked: false,
    slotDayStartingTime: new Date(2018, 11, 10, 9),
    startTime: new Date(2018, 11, 10, 11),
    endTime: new Date(2018, 11, 10, 12),
  });
  const client1Avail3 = new InterviewAvailabilityCalender({
    userId: client._id,
    booked: false,
    slotDayStartingTime: new Date(2018, 11, 10, 9),
    startTime: new Date(2018, 11, 10, 12),
    endTime: new Date(2018, 11, 10, 13),
  });
  return BluePromise.all([
    client1Exp.save(),
    client1Proj.save(),
    client1Skill.save(),
    client1Avail1.save(),
    client1Avail2.save(),
    client1Avail3.save(),
  ]);
};

const saveConsultant2Details = async (client: any) => {
  const client2Exp = new Experience({
    userId: client._id,
    companyName: 'Disney',
    companyIndustryLine: 'Movies',
  });
  const client2Proj = new EmployeeProjects({
    userId: client._id,
    clientsCompanyName: 'Disney',
    projectName: 'Cindrella Story',
  });
  const client2Skill = new Skills({
    userId: client._id,
    skillTitle: 'Strong',
    uniqueTitle: 'strong123',
    proficiency: 'great',
  });
  const client2Avail1 = new InterviewAvailabilityCalender({
    userId: client._id,
    booked: false,
    slotDayStartingTime: new Date(2018, 11, 10, 9),
    startTime: new Date(2018, 11, 10, 10),
    endTime: new Date(2018, 11, 10, 11),
  });
  const client2Avail2 = new InterviewAvailabilityCalender({
    userId: client._id,
    booked: false,
    slotDayStartingTime: new Date(2018, 11, 10, 9),
    startTime: new Date(2018, 11, 10, 11),
    endTime: new Date(2018, 11, 10, 12),
  });
  const client2Avail3 = new InterviewAvailabilityCalender({
    userId: client._id,
    booked: false,
    slotDayStartingTime: new Date(2018, 11, 10, 9),
    startTime: new Date(2018, 11, 10, 12),
    endTime: new Date(2018, 11, 10, 13),
  });

  return await BluePromise.all([
    client2Exp.save(),
    client2Proj.save(),
    client2Skill.save(),
    client2Avail1.save(),
    client2Avail2.save(),
    client2Avail3.save(),
  ]);
};

export const initUsers = async () => {
  const savableConsultant = new User(consultant);
  const savableDumUser1 = new User(dumUser1);
  const savableTemp = new TempUser(temp1);
  const savableAdmin = new User(admin);
  const savableClient1 = new User(newUserClient1);
  const savableClient2 = new User(newUserClient2);

  await BluePromise.all([
    savableConsultant.save(),
    savableDumUser1.save(),
    savableTemp.save(),
    savableAdmin.save(),
    newUserBPM.save(),
    savableClient1.save(),
    savableClient2.save(),
  ]);

  const catLogSave = industrySave.save().then(data => {
    const catObj = new Project({
      industryLine: data._id,
      userId: '5b8533cac72ea32730dff967',
    });
    return catObj.save();
  });

  const consultant1SaveP = dumConsul1
    .save()
    .then(data => saveConsultant1Details(data));

  const consultant2SaveP = dumConsul2
    .save()
    .then(data => saveConsultant2Details(data));

  await BluePromise.all([catLogSave, consultant1SaveP, consultant2SaveP]);
};
