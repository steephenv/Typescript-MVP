import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

let token: string;

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

describe('Get interview date', () => {
  it('Get interview date', done => {
    supertest(app)
      .get('/v1/interview-old/get-date')
      .set({ Authorization: `Bearer ${token}` })
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
