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

describe('Test for project-key-parameters save data  ===> ', () => {
  it('Saving project-key-params save details api', done => {
    supertest(app)
      .post(`/v1/project/save-key-param`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        currentStatus: 'sadsad',
        currentSituation: 'sdfdsf',
        challengeType: 'cvdsjhgv',
        challenge: 'cbbxgcge',
        degreeOfChallenge: 'nxcdshgsa',
        goalValueAdd: 'ssdcvmnjas',
        desiredFutureSituation: 'sdjhysgdew',
        targetStart: 'sdhfvgnxcb',
        expectedEnd: 'bcvhdsgftwesa',
        mainLocation: 'tehsdkvn',
        additionalLocations: 'nvsteddxsv',
        location2: 'AHDGBUYHASCV',
        location3: 'BCSYDGFYEWTC',
        location4: 'ZXBCHSAYHBSACC',
        communication: 'BCHSAFCAS',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Updating project-key-parameters details api', done => {
    supertest(app)
      .post(`/v1/project/save-key-param?userId=${newUserId}`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        currentStatus: 'sadsad',
        currentSituation: 'sdfdsf',
        challengeType: 'cvdsjhgv',
        challenge: 'cbbxgcge',
        degreeOfChallenge: 'nxcdshgsa',
        goalValueAdd: 'ssdcvmnjas',
        desiredFutureSituation: 'sdjhysgdew',
        targetStart: 'sdhfvgnxcb',
        expectedEnd: 'bcvhdsgftwesa',
        mainLocation: 'tehsdkvn',
        additionalLocations: 'nvsteddxsv',
        location2: 'AHDGBUYHASCV',
        location3: 'BCSYDGFYEWTC',
        location4: 'ZXBCHSAYHBSACC',
        communication: 'BCHSAFCAS',
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
