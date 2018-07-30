import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing project-sub-category creation', () => {
  test('testing route', done => {
    supertest(app)
      .post('/v1/project/save-single-sub-category')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        categoryId: '5b4f0845b48361468f85033c',
        subCategory: 'felis-cat',
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
