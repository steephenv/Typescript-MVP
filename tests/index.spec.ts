import { app } from '../src/app';

import * as supertest from 'supertest';

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
