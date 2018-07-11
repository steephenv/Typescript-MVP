import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Test for forgot-password functionality ===> ', () => {
  it('Login with incorrect credentials', async done => {
    try {
      const res = await supertest(app)
        .post('/v1/auth/forgot-password')
        .send({
          email: 'loki@marvel.com',
          url: 'http://fasdfasd.com/token={token}',
        })
        .expect(202);
      expect(res.body.success).toEqual(true);
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
