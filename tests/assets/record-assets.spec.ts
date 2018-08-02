import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing asset recording', () => {
  test('testing route: update', done => {
    supertest(app)
      .post('/v1/assets/record')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        _id: '5b4f0845b48361468f85033c',
        title: 'fasdf',
        fileAccessUrls: ['fasdf'],
        fileName: 'adsfasd',
        userId: '5b4f0845b48361468f85033c',
      })
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test('testing route: create', done => {
    supertest(app)
      .post('/v1/assets/record')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'fasdf',
        fileAccessUrls: ['fasdf'],
        fileName: 'adsfasd',
        userId: '5b4f0845b48361468f85033c',
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
