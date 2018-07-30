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

describe('Test for project searching api  ===> ', () => {
  it('searching project api', done => {
    supertest(app)
      .post('/v1/project/search-project')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        category: 'ProjCat 2',
        // subCategory: 'ProjSub 2',
        // industryLine: 'sdfs',
        // businessFunctions: 'fsdefs',
        // technology: 'tro',
        // effort: 'Low (< 20 days)',
        price: '20000',
        // impact: 'Procurement Saving',
        // referenceClientTypes: 'Small',
        // referenceProjectDate: '2018-03-31T18:30:00.000Z',
        referenceCountry: 'Canada',
        // referenceLanguage: 'fr',
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
