import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

// let token: string;

beforeAll(async () => {
  // supertest(app)
  //   .post('/v1/auth/login')
  //   .send({ username: 'stark@marvel.com', password: 'password' })
  //   .expect(200)
  //   .end((err, { body }) => {
  //     if (err) {
  //       throw err;
  //     }
  //     token = body.accessToken;
  //   });
  return;
});

describe('testing asset recording', () => {
  test('testing route', done => {
    supertest(app)
      .post('/v1/assets/record')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'fasdf',
        category: 'fasdf',
        accessUrl: 'adsfasd',
        fileName: 'fasdf',
        fileType: 'asdf',
        userId: '5b4f0845a48361468f85033c',
      })
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test('testing route', done => {
    supertest(app)
      .post('/v1/assets/record')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'fasdfadsfdsf',
        category: 'fasdfasdf',
        accessUrl: 'adsfasadsfd',
        fileName: 'fasdffasd',
        fileType: 'asdfasdf',
        userId: '5b4f0845b48361468f85033c',
        attributes: ['fasdfasdfa', 'asdfadsf'],
      })
      .expect(201)
      .end(err => {
        if (err) {
          throw err;
        }
        done();
      });
  });
  test('testing route: fail case', done => {
    supertest(app)
      .post('/v1/assets/record')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'fasdfadsfdsf',
        category: 'fasdfasdf',
        accessUrl: 'adsfasadsfd',
        fileName: 'fasdffasd',
        fileType: 'asdfasdf',
        userId: '5b4f0845b48361468f85033c',
        attributes: 'fasdfasdfa',
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
