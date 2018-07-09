import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('List and schedule interviews', () => {
  it('List interview dates', done => {
    supertest(app)
      .get('/v1/interview/list-dates')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
