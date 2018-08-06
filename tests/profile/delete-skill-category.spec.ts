import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { SkillCategory } from '../../src/models/SkillCategory';
import { SkillSubCategory } from '../../src/models/SkillSubCategory';

let token = '';
let catSave: any;
let subSave: any;

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
      const newCat = new SkillCategory({
        category: 'deleteSkillCategory',
        cluster: 'Personal',
      });
      catSave = await newCat.save();
      const newSubCat = new SkillSubCategory({
        categoryId: newCat._id,
        subCategory: 'deleteSkillSubCategory',
      });
      subSave = await newSubCat.save();
      return done();
    });
});

describe('Save skill category ==> ', () => {
  it('Save skill category', done => {
    supertest(app)
      .post(`/v1/profile/delete-skill-category`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        model: 'category',
        ids: [catSave._id],
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
