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

describe('Test for project update  ===> ', () => {
  it('project update api', done => {
    supertest(app)
      .post('/v1/project/update-project')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        projectId: '5b68364de25d265325ec54c3',
        projectTitle: 'MusicMatch',
        currentSituation: 'plan ind',
        targetSituation: 'Fully-fledged online music platform',
        targetGroup: 'all',
        category: '5b598e0f746364417c569061',
        subCategory: '5b598e0f746364417c569066',
        industryLine: '5b56deb462c159350a0b1166',
        businessFunctions: '5b597288be34302da22c7921',
        projectStages: 'Business Case',
        technology: 'tro',
        projectMaturity: 'Expertise',
        effort: 'Low (< 20 days)',
        price: 20000,
        impact: 'Procurement Saving',
        impactLevel: 'Medium',
        picture:
          'https://miwago-assets.s3.amazonaws.com/assets/profile_pics/SJpyjIdV7_wimbledon_aerial-tt.jpg',
        referenceIndustry: 'Manufacturing',
        referenceClientTypes: 'Small',
        referenceProjectDate: '2018-03-31T18:30:00.000Z',
        referenceCountry: 'Canada',
        referenceLanguage: 'fr',
        deliverables: 'deliverable 1',
        duration: '6 months',
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
