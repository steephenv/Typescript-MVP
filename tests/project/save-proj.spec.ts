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
      .post(`/v1/project/save-project`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        projectTittle: 'dsvbusyhv',
        currentSituation: 'dsvbusyhv',
        targetSituation: 'dsvbusyhv',
        targetGroup: 'dsvbusyhv',
        category: 'dsvbusyhv',
        subCategory: 'dsvbusyhv',
        industryLine: 'dsvbusyhv',
        businessFunctions: 'dsvbusyhv',
        businessSubFunctions: 'dsvbusyhv',
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
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Updating personal details api', done => {
    supertest(app)
      .post(`/v1/project/save-project?userId=${newUserId}`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        projectTittle: 'dsvbzxvxzusyhv',
        currentSituation: 'dsvbusyhv',
        targetSituation: 'dsvbusyhv',
        targetGroup: 'dsvbusyhv',
        category: 'xzvvzzxv',
        subCategory: 'dsvbusyhv',
        industryLine: 'dsvbusyhv',
        businessFunctions: 'xzvzxvdsvbusyhv',
        businessSubFunctions: 'dsvbusxzvyhv',
        projectStages: 'dsvbusyhv',
        technology: 'dsvbuxzvvsyhv',
        projectMaturity: 'dsxzvxvvbusyhv',
        effort: 'dsvbusyhv',
        price: 124,
        impact: 'dsvbusyhv',
        impactLevel: 'dsvzxvxzvbusyhv',
        picture: 'dsvbusyhv',
        referenceIndustry: 'dsvbusyhv',
        referenceClientTypes: 'dsvbusyhv',
        referenceProjectDate: new Date(),
        referenceCountry: 'dsvbusyhv',
        referenceLanguage: 'dsvbusyhv',
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
