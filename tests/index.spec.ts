import * as supertest from 'supertest';

import { app } from '../src/app';

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
