import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing business-fn', () => {
  test('testing creation', done => {
    supertest(app)
      .post('/v1/assets/business-functions')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        content: [{ name: 'cat-business-fn' }],
      })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test('testing update', done => {
    supertest(app)
      .post('/v1/assets/business-functions')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        content: [{ _id: '5b4f0845b48361468f85033c', name: 'cat-business-fn' }],
      })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
