/* eslint no-undef: 0 */

import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

const clientEmail = 'sid@cubettech.com';

let adminToken = '';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

beforeAll(done => {
  supertest(app)
    .post('/v1/auth/login')
    .set('X-Requested-With', 'XMLHttpRequest')
    .send({
      username: 'red@velvet.com',
      password: 'password',
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      adminToken = res.body.accessToken;
      return done();
    });
});

describe('Test direct registration functionality ==> ', () => {
  it('Test direct registration functionality - client', done => {
    supertest(app)
      .post(`/v1/auth/direct-registration`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({
        firstName: 'Sid',
        lastName: 'Asgard',
        email: clientEmail,
        password: 'password',
        role: 'Client',
        confirmPassword: 'password',
        mobile: '0987654321',
      })
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
