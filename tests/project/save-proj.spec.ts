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

describe('Test for project data  ===> ', () => {
  it('Saving project details api', done => {
    supertest(app)
      .post('/v1/project/save-project?category=5b597254e72ede2d3a4941e7')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        projectTittle: 'dsvbusyhv',
        currentSituation: 'dsvbusyhv',
        targetSituation: 'dsvbusyhv',
        targetGroup: 'dsvbusyhv',
        category: 'dsvbusyhv',
        subCategory: 'dsvbusyhv',
        industryLine: 'testindustryline',
        businessFunctions: 'TrialBusFn',
        businessSubFunctions: 'createSubFn',
        projectStages: 'dsvbusyhv',
        technology: 'dsvbusyhv',
        projectMaturity: 'dsvbusyhv',
        effort: 'dsvbusyhv',
        price: 124,
        impact: 'dsvbusyhv',
        impactLevel: 'dsvbusyhv',
        picture: 'dsvbusyhv',
        referenceIndustry: 'dsvbusyhv',
        referenceClientTypes: 'dsvbusyhv',
        referenceProjectDate: new Date(),
        referenceCountry: 'dsvbusyhv',
        referenceLanguage: 'dsvbusyhv',
        // categoryId: '5b586952d878f458b9b2a7ef',
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
