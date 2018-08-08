import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

let token = '';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

beforeAll(done => {
  supertest(app)
    .post('/v1/auth/login')
    .set('X-Requested-With', 'XMLHttpRequest')
    .send({
      username: 'stark@marvel.com',
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

describe.skip('Generate pdf of user details', () => {
  it(
    'pdf generation',
    done => {
      supertest(app)
        .get(`/v1/profile/gen-pdf`)
        .set('X-Requested-With', 'XMLHttpRequest')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    800000,
  );
});
