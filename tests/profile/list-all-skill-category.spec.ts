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
    .end(async (err, res) => {
      if (err) {
        throw err;
      }
      token = res.body.accessToken;
      return done();
    });
});

describe('List all skill category ==> ', () => {
  it('List skill category', done => {
    supertest(app)
      .get(`/v1/profile/list-all-skill-categories`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
