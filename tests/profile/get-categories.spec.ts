import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { SkillCategory } from '../../src/models/SkillCategory';

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

      cats = await SkillCategory.find({}).exec();
      return done();
    });
});

describe('Test fetching Skills category data  ===> ', () => {
  it('fetching skill category data api', done => {
    supertest(app)
      .get(`/v1/profile/get-skill-category?cluster=Personal`)
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
  it('fetching skill sub category data api', done => {
    supertest(app)
      .get(`/v1/profile/get-sub-category?category=` + cats[0]._id)
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
