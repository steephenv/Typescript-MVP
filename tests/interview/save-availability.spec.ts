import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Test for availability save', () => {
  test('creating slots', done => {
    supertest(app)
      .post('/v1/interview/save-availability-calender')
      .send({
        dateRange: {
          startDate: 'Fri Jul 20 2018 09:58:32 GMT+0530 (India Standard Time)',
          endDate: 'Sun Aug 05 2018 00:00:00 GMT+0530 (India Standard Time)',
        },
        workingDays: [1, 2, 5],
        workingTime: { startTime: 9, endTime: 16 },
        breakTime: { startTime: 1, endTime: 2 },
      })
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
