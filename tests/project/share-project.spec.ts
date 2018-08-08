import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

let token = '';
let newUserId: string;

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

beforeAll(done => {
  supertest(app)
    .post('/v1/auth/login')
    .set('X-Requested-With', 'XMLHttpRequest')
    .send({
      username: 'stark@marvel.com',
      password: 'password',
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      newUserId = res.body.data._id;
      token = res.body.accessToken;
      return done();
    });
});

describe('Test for sharing project ===> ', () => {
  it('Test for sharing project ', done => {
    supertest(app)
      .post('/v1/project/share-project')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        type: 'project',
        sharedLink: [
          'https://google.com',
          'https://gmail.com',
          'https://yahoo.com',
        ],
        sharedTo: 'sss@gmail.com',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
describe('Test for sharing project ===> ', () => {
  it('Test for sharing project ', done => {
    supertest(app)
      .post('/v1/project/share-project')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        type: 'project',
        sharedLink: [
          'https://google.com',
          'https://gmail.com',
          'https://yahoo.com',
        ],
        sharedTo: '',
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
