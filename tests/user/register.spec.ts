/* eslint no-undef: 0 */

import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

const keyEmail = 'loki1234@marvel.com';
const client1 = 'rdj1234@nnn.com';
let adminToken = '';

// Test
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

describe('Test for signup functionality ===> ', () => {
  test(
    'Registration Functionality',
    done => {
      supertest(app)
        .post('/v1/auth/register')
        .send({
          firstName: 'Loki',
          lastName: 'Asgard',
          email: keyEmail,
          password: 'australia',
          appliedRole: 'User',
          confirmPassword: 'australia',
          isDirectRegistration: false,
          url: 'dfsfsd?token={token}',
          mobile: '0987654321',
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    15000,
  );

  test('Testing local register of user with invalid data ', done => {
    supertest(app)
      .post('/v1/auth/register')
      .send({
        firstName: '',
        lastName: 'ponding',
        email: 12345,
        password: 'australia',
        mobile: '1234567890',
      })
      .expect(422)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });

  test('Testing local register of user with existing email ', done => {
    supertest(app)
      .post('/v1/auth/register')
      .send({
        firstName: 'ricky',
        lastName: 'ponding',
        email: 'keyEmail',
        password: 'australia',
        mobile: '1234567890',
      })
      .expect(422)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });

  test(
    'Client registration ',
    async done => {
      supertest(app)
        .post('/v1/auth/register')
        .send({
          firstName: 'Tony',
          lastName: 'stark',
          email: client1,
          password: 'iamIron',
          confirmPassword: 'iamIron',
          appliedRole: 'Client',
          callTime: new Date(),
          url: 'dfsfsd?token={token}',
          companyName: 'Stark Industries',
          mobile: '1234567890',
        })
        .expect(201)
        .end(err => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    15000,
  );

  test('Client registration - Without Company name', done => {
    supertest(app)
      .post('/v1/auth/register')
      .send({
        firstName: 'Tony',
        lastName: 'stark',
        email: client1,
        password: 'iamIron',
        confirmPassword: 'iamIron',
        appliedRole: 'Client',
        callTime: '8 am',
        mobile: '1234567890',
      })
      .expect(422)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });

  test('Client registration - free email', done => {
    supertest(app)
      .post('/v1/auth/register')
      .send({
        firstName: 'Tony',
        lastName: 'stark',
        email: 'jj.gmail.com',
        password: 'iamIron',
        confirmPassword: 'iamIron',
        appliedRole: 'Client',
        callTime: '8 am',
        mobile: '1234567890',
      })
      .expect(422)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });

  test(
    'Client direct registration ',
    async done => {
      supertest(app)
        .post('/v1/auth/register')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'Sid',
          lastName: 'stark',
          email: 'sid1234@cubettech.com',
          password: 'iamIron',
          confirmPassword: 'iamIron',
          role: 'Client',
          isDirectRegistration: true,
          callTime: new Date(),
          companyName: 'Stark Industries',
          mobile: '1234567890',
        })
        .expect(201)
        .end(err => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    15000,
  );
});
