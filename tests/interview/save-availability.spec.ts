import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { User } from '../../src/models/User';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

let token: string;
let bpm: any;

beforeAll(done => {
  supertest(app)
    .post('/v1/auth/login')
    .set('X-Requested-With', 'XMLHttpRequest')
    .send({
      username: 'stark@marvel.com',
      password: 'password',
    })
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        throw err;
      }
      token = res.body.accessToken;
      bpm = await User.findOne({
        role: 'BPM',
      }).exec();
      return done();
    });
});

describe('Test for availability save', () => {
  test(
    'creating slots',
    done => {
      supertest(app)
        .post('/v1/interview/save-availability-calender')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          dateRange: {
            startDate:
              'Mon Aug 27 2018 05:30:00 GMT+0530 (India Standard Time)',
            endDate: 'Thu Sep 27 2018 05:30:00 GMT+0530 (India Standard Time)',
          },
          workingDays: ['Sunday', 'Monday', 'Tuesday', 'Thursday'],
          workingTime: {
            startTime:
              'Mon Jul 30 2018 09:00:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Jul 30 2018 18:00:00 GMT+0530 (India Standard Time)',
          },
          breakTime: {
            startTime:
              'Mon Jul 30 2018 13:00:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Jul 30 2018 14:00:00 GMT+0530 (India Standard Time)',
          },
          userId: '5b5ed5287630af443bcf2843',
          annualAvailability: 20,
        })
        .expect(200)
        .end((err, { body }) => {
          if (err) {
            throw err;
          }
          done();
        });
    },
    80000,
  );
});
