import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

let token = '';

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
      token = res.body.accessToken;
      return done();
    });
});

describe('List users api', () => {
  it('Listing employees and consultants', done => {
    supertest(app)
      .get(
        `/v1/auth/list-users/1?values=["Employee", "Consultant"]&field=appliedRole`,
      )
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('profile data verified check', done => {
    supertest(app)
      .get(
        `/v1/auth/list-users/1?values=["Employee", "Consultant"]&field=appliedRole&profileDataVerified=true`,
      )
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
