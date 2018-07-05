import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Login functionality ==> ', () => {
  it('Login with all credentials', done => {
    supertest(app)
      .post('/v1/auth/login')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        username: 'stark@marvel.com',
        password: 'password',
      })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Login with field missing', done => {
    supertest(app)
      .post('/v1/auth/login')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        username: 'stark@marvel.com',
      })
      .expect(401)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
