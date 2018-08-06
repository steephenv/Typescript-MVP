import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing project-category creation', () => {
  test('testing route', done => {
    supertest(app)
      .post('/v1/project/save-single-category')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        category: 'cat-name-project',
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
