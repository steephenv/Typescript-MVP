import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { ProjectCategory } from '../../src/models/ProjectCategory';
import { ProjectSubCategory } from '../../src/models/ProjectSubCategory';

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
      const newCat = new ProjectCategory({ category: 'deleteProjCategory' });
      catSave = await newCat.save();
      const newSubCat = new ProjectSubCategory({
        categoryId: newCat._id,
        subCategory: 'deleteProjSubCategory',
      });
      subSave = await newSubCat.save();
      return done();
    });
});

describe('Save project category ==> ', () => {
  it('Save project category', done => {
    supertest(app)
      .post(`/v1/project/delete-category`)
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
