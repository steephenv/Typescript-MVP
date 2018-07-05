import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

let tokenNew = '';

describe('Test for forgot-password functionality ===> ', () => {
  it('forgot password request', async done => {
    try {
      const res = await supertest(app)
        .post('/v1/auth/forgot-password')
        .send({
          email: 'loki@marvel.com',
          url: 'http://fasdfasd.com/token={token}',
        })
        .expect(202);
      expect(res.body.success).toEqual(true);
      tokenNew = res.body.url.substr(res.body.url.lastIndexOf('=') + 1);
      return done();
    } catch (err) {
      return done(err);
    }
  });
  it('reset password api', async done => {
    try {
      const res = await supertest(app)
        .post('/v1/auth/reset-password')
        .send({
          token: tokenNew,
          password: 'password',
          confirmPassword: 'password',
        })
        .expect(200);
      expect(res.body.success).toEqual(true);
      return done();
    } catch (err) {
      return done(err);
    }
  });
  it('reset password api - field missing', async done => {
    try {
      const res = await supertest(app)
        .post('/v1/auth/reset-password')
        .send({
          token: tokenNew,
          confirmPassword: 'password',
        })
        .expect(422);
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
