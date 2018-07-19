import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Test for availability save', () => {
  test('creating slots', done => {
    supertest(app)
      .get('/v1/interview/save-availability-calender')
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
