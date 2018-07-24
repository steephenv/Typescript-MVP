import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing asset-category creation', () => {
  test('testing route', done => {
    supertest(app)
      .post('/v1/assets/category')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        name: 'cat-name',
      })
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
