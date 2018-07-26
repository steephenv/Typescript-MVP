import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing asset listing', () => {
  test('testing normal search', done => {
    supertest(app)
      .get('/v1/assets?fileName=mango')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test('testing keyQuery search', done => {
    supertest(app)
      .get('/v1/assets?keyQuery=a&description=lorem ipsium doller sit')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
