// import * as supertest from 'supertest';
// import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

// afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));
import * as got from 'got';

let tokenNew = '';

describe('Test for forgot-password functionality ==> ', () => {
  it('forgot password request', done => {
    got('http://localhost:7000/v1/auth/forgot-password', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        email: 'loki@marvel.com',
        url: 'http://fasdfasd.com/token={token}',
      },
    })
      .then(({ body }) => {
        tokenNew = body.url.substr(body.url.lastIndexOf('=') + 1);
        done();
      })
      .catch(err => {
        throw err;
      });
  });
  it('Reset password API', done => {
    got('http://localhost:7000/v1/auth/reset-password', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        token: tokenNew,
        password: 'password',
        confirmPassword: 'password',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  it('Reset password API - Reset operation on same link', done => {
    got('http://localhost:7000/v1/auth/reset-password', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        token: tokenNew,
        password: 'password',
        confirmPassword: 'password',
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(400);
        done();
      });
  });
  it('Reset password API - Field missing', done => {
    got('http://localhost:7000/v1/auth/reset-password', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        token: tokenNew,
        confirmPassword: 'password',
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
});
