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
              'Fri Jul 20 2018 09:58:32 GMT+0530 (India Standard Time)',
            endDate: 'Sun Aug 05 2018 00:00:00 GMT+0530 (India Standard Time)',
          },
          workingDays: [1, 2, 5],
          workingTime: { startTime: 9, endTime: 16 },
          breakTime: { startTime: 13, endTime: 14 },
          userId: bpm._id,
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
