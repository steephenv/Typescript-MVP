import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

const obj = [{ fileName: 'fasd', fileType: 'fasdf', filePath: 'afsf/fasdf/' }];

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing sign-for-upload fn', () => {
  test('testing route with good requests', done => {
    supertest(app)
      .post('/v1/utils/sign-for-upload')
      .send({
        objectsToSign: obj,
      })
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        done();
      });
  });

  test('testing route with null array', done => {
    supertest(app)
      .post('/v1/utils/sign-for-upload')
      .send({
        objectsToSign: [],
      })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });

  test('testing route with null array', done => {
    supertest(app)
      .post('/v1/utils/sign-for-upload')
      .send({
        objectsToSign: [{ mango: 2 }],
      })
      .expect(422)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
