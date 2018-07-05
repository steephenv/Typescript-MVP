import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { TempUser } from '../../src/models/TempUser';

beforeAll(async done => {
  await TempUser.update(
    { email: 'jo@marvel.com' },
    { $set: { createdAt: new Date(), token: 'xxxxx' } },
  );
  done();
});

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Test for confirm functionality ===> ', () => {
  it('Confirm user ', done => {
    supertest(app)
      .post('/v1/auth/confirm?token=xxxxx')
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
