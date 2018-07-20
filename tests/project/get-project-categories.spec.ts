import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { ProjectCategory } from '../../src/models/ProjectCategory';

let token = '';
let newUserId: string;
let cats: any;

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
    .end(async (err, res) => {
      if (err) {
        throw err;
      }
      newUserId = res.body.data._id;
      token = res.body.accessToken;

      cats = await ProjectCategory.find({}).exec();
      return done();
    });
});

describe('Test fetching project category data  ===> ', () => {
  it('fetching project category data api', done => {
    supertest(app)
      .get(`/v1/project/get-project-category`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('fetching project sub category data api', done => {
    supertest(app)
      .get(`/v1/project/get-proj-sub-category?category=` + cats[0]._id)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
