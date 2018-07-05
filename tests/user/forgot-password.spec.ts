import * as supertest from 'supertest';
import { app } from '../../src/app';

describe('Test for forgot-password functionality ===> ', () => {
  it('Login with incorrect credentials', async done => {
    try {
      const res = await supertest(app)
        .post('/v1/forgot-password')
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
