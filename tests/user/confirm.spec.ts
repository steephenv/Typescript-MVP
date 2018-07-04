import * as supertest from 'supertest';
import { app } from '../../src/app';

describe('Test for signup functionality ===> ', () => {
  it(
    'Registration Functionality',
    done => {
      supertest(app)
        .post('/v1/auth/register')
        .send({
          firstName: 'Loki',
          lastName: 'Asgard',
          email: 'lakshmipriya.m@cubettech.com',
          password: 'australia',
          appliedRole: 'User',
          confirmPassword: 'australia',
          url: 'dfsfsd?token={token}',
          mobile: '0987654321',
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
  it('Confirm user ', done => {
    supertest(app)
      .post('/v1/auth/confirm?token=SJYdxLcMX')
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
