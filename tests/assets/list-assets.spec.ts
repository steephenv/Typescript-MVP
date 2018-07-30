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
  test('testing excludeUsers search', done => {
    supertest(app)
      .get('/v1/assets?keyQuery=a&exUserId=5b4f0845b48361468f85032c')
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
