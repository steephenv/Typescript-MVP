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
      const newCat = new ProjectCategory({ category: 'xxxxxxx' });
      catSave = await newCat.save();
      const newSubCat = new ProjectSubCategory({
        categoryId: newCat._id,
        subCategory: 'zzzzz',
      });
      subSave = await newSubCat.save();
      return done();
    });
});

describe('Save project category ==> ', () => {
  it('Save project category', done => {
    supertest(app)
      .post(`/v1/project/save-project-category`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        category: 'Adipoli',
        subCategories: [{ subCategory: 'newAdiploi' }],
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Save project category - Bad request', done => {
    supertest(app)
      .post(`/v1/project/save-project-category`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        category: 'Adipoli',
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Update project category', done => {
    supertest(app)
      .post(`/v1/project/update-project-category`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        category: 'Adipoli_new',
        _id: catSave._id,
        subCategories: [
          { subCategory: 'newAdiploi_neww', _id: subSave._id },
          { subCategory: 'newwwwwwwww' },
        ],
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Update project category - bad request', done => {
    supertest(app)
      .post(`/v1/project/update-project-category`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        category: 'Adipoli',
        subCategories: [{ subCategory: 'newAdiploi' }],
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
