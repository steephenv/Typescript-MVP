import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Save category api ===> ', () => {
  it('Save category - good data', done => {
    supertest(app)
      .post(`/v1/admin/project-category/save`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        category: 'Project Cat 1',
        subCategories: [{ subCategory: 'proj sub 1' }],
      });
  });
});
