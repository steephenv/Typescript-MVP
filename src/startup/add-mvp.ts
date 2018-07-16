import * as lme from 'lme';
import { Promise as BluePromise } from 'bluebird';

import { TimeSlot } from '../models/TimeSlots';
import { User } from '../models/User';
import { AvailabilityCalender } from '../models/AvailabilityCalender';

export const createMVP = async () => {
  try {
    const newUser = new User({
      firstName: 'Martin',
      lastName: 'Luther',
      email: 'mvp@marvel.com',
      password: '123456',
      role: 'BPM',
      appliedRole: 'BPM',
      mobile: '4554543',
    });
    const user = await newUser.save();
    const slots = await TimeSlot.find({}).exec();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStrings = `${tomorrow.getFullYear()}-${tomorrow.getMonth() +
      1}-${tomorrow.getDate()}`;

    const tomorrow1 = new Date();
    tomorrow1.setDate(tomorrow1.getDate() + 2);
    const dateS2 = `${tomorrow1.getFullYear()}-${tomorrow1.getMonth() +
      1}-${tomorrow1.getDate()}`;

    const cal1 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow,
      slot: slots[1],
      dateString: dateStrings,
    });
    const cal3 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow,
      slot: slots[3],
      dateString: dateStrings,
    });
    const cal2 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow,
      slot: slots[2],
      dateString: dateStrings,
    });

    const cal4 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow1,
      slot: slots[1],
      dateString: dateS2,
    });

    const cal5 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow1,
      slot: slots[2],
      dateString: dateS2,
    });

    const cal6 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow1,
      slot: slots[3],
      dateString: dateS2,
    });

    const cls = [cal1, cal2, cal3, cal4, cal5, cal6];
    await BluePromise.map(cls, cl => {
      return cl.save();
    });
    lme.i('Finished');
  } catch (err) {
    lme.e(err);
  }
};
