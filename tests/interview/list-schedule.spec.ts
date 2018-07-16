import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('List and schedule interviews', () => {
  it(
    'List interview dates',
    done => {
      supertest(app)
        .get('/v1/interview/list-dates?date=2018-11-12')
        .set('X-Requested-With', 'XMLHttpRequest')
        .expect(200)
        .end(err => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    50000,
  );
});
