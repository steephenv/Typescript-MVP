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

describe('Test for saving wlb data  ===> ', () => {
  it('Saving wlb details api', done => {
    supertest(app)
      .post(`/v1/profile/save-wlb`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        annualAvailableCapacity: 'dshfvhsdvf',
        capricornsAvailableCapacity: 'dsbfhjsdfds',
        frequencyOnsiteWork: 2153,
        frequencyHomeOfficeWork: 1265,
        location: ['dsfhhjsd', 'sdfbhsd', 'dbfhbd'],
        workPermit: 'dsfdshj',
      })
      .expect(200)
      .end((err, res) => {
        // console.log(res.body.msg.details);
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
