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
      role: 'MVP',
      appliedRole: 'MVP',
      mobile: '4554543',
    });
    const user = await newUser.save();
    const slots = await TimeSlot.find({}).exec();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStrings = `${tomorrow.getFullYear()}-${tomorrow.getMonth() +
      1}-${tomorrow.getDate()}`;
    const cal1 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow,
      slot: slots[1],
      dateString: dateStrings,
    });
    const cal2 = new AvailabilityCalender({
      userId: [user._id],
      date: tomorrow,
      slot: slots[2],
      dateString: dateStrings,
    });
    const cls = [cal1, cal2];
    await BluePromise.map(cls, cl => {
      return cl.save();
    });
    lme.i('Finished');
  } catch (err) {
    lme.e(err);
  }
};
