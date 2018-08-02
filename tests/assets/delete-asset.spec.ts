import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing asset-category listing', () => {
  test('testing route', done => {
    supertest(app)
      .delete('/v1/assets?_id=5b4f0845b48361468f85033c')
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
