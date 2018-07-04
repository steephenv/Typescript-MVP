import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('test', () => {
  test('testing for humans', done => {
    supertest(app)
      .get('/humans.txt')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
