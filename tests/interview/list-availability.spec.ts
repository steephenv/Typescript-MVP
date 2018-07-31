import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Test for availability listing', () => {
  test('list slots', done => {
    supertest(app)
      .get('/v1/interview/list-availability?forward=false&date=2018-08-29')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
