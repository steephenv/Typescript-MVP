/* eslint no-undef: 0 */

import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';
import { SkillCategory } from '../../src/models/SkillCategory';
import { SkillSubCategory } from '../../src/models/SkillSubCategory';

let token = '';
let newUserId: string;
let catId: string;
let subId: string;

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

      const cats = await SkillCategory.find({}).exec();
      catId = cats[0]._id;
      const subCats = await SkillSubCategory.find({}).exec();
      subId = subCats[0]._id;
      return done();
    });
});

describe('Test for skills  ===> ', () => {
  it('Saving skill api', done => {
    supertest(app)
      .post('/v1/profile/save-skills')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        skills: [
          {
            cluster: 'Personal',
            category: catId,
            subCategory: subId,
            proficiency: 'Excellent',
            skillTitle: 'assasasa',
          },
        ],
      })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Saving skill api - same user', done => {
    supertest(app)
      .post('/v1/profile/save-skills')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        skills: [
          {
            cluster: 'Personal',
            category: catId,
            subCategory: subId,
            proficiency: 'Excellent',
            skillTitle: 'assasasa',
          },
          {
            cluster: 'Functional',
            category: catId,
            subCategory: subId,
            proficiency: 'Excellent',
            skillTitle: 'assasasa',
            description: 'cccc',
            certificate: 'rerwtyetry',
            lastApplied: 2005,
          },
        ],
      })
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
