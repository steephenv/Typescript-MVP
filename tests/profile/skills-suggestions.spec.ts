import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { SkillSubCategory } from '../../src/models/SkillSubCategory';

let token = '';
let subId = '';

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
      token = res.body.accessToken;
      const subCats = await SkillSubCategory.find({}).exec();
      subId = subCats[0]._id;
      return done();
    });
});

describe('Test fetching Skills category data  ===> ', () => {
  it('fetching skill category data api', done => {
    supertest(app)
      .get(`/v1/profile/skill-suggestions?subCategory=${subId}`)
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
