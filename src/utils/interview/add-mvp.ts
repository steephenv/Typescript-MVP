import mongoose = require('mongoose');
import lme from 'lme';
import * as config from 'config';
import { Promise as BluePromise } from 'bluebird';
// Connect to MongoDB
const MONGO_URI: string = config.get('database.url');

import { TimeSlot } from '../../models/TimeSlots';
import { User } from '../../models/User';
import { AvailabilityCalender } from '../../models/AvailabilityCalender';

// Promisifying all mongoose methods
mongoose.Promise = BluePromise;

const createMVP = async () => {
  try {
    await mongoose.connect(MONGO_URI);
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
    const cal1 = new AvailabilityCalender({
      userId: [user._id],
      date: new Date(),
      slot: slots[1],
      dateString: '2018-07-04',
    });
    const cal2 = new AvailabilityCalender({
      userId: [user._id],
      date: new Date(),
      slot: slots[2],
      dateString: '2018-07-04',
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

createMVP();
