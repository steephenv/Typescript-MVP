import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing buss-sub-fn listing', () => {
  test('testing route', done => {
    supertest(app)
      .get(
        '/v1/assets/business-sub-functions?businessFunctionId=5b4f0845b48361468f85033c',
      )
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
