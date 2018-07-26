import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing industry creation', () => {
  test('testing route', done => {
    supertest(app)
      .post('/v1/assets/industries')
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        name: 'Acinonyx',
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
