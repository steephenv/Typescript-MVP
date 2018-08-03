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
      .post('/v1/project/filter-project')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        searchKey: 'music',
        // userId: '5b63fecaa63cbe3329b0aa7c',
        // projectTitle: 'MusicMatch',
        // category: ['5b5f02cbb19b436977beb3e1'],
        // subCategory: ['5b598e0f746364417c569066'],
        // industryLine: [],
        // businessFunctions: ['5b5f02f67fdc3a69b2a98767'],
        // technology: 'tro',
        // effort: 'Low (< 20 days)',
        // price: 20000,
        // impact: 'Procurement Saving',
        // referenceClientTypes: 'Small',
        // referenceProjectDate: '2018-03-31T18:30:00.000Z',
        // referenceCountry: 'Canada',
        // referenceLanguage: 'fr',
      })
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
// describe('Test for project searching api with no parameters ===> ', () => {
//   it('searching project api with no parameters', done => {
//     supertest(app)
//       .post('/v1/project/search-project')
//       .set('X-Requested-With', 'XMLHttpRequest')
//       .set({ Authorization: `Bearer ${token}` })
//       .send({})
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         return done();
//       });
//   });
// });
