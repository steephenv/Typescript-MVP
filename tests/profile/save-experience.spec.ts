import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

let token = '';

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
      token = res.body.accessToken;
      return done();
    });
});

describe('Test for saving experience data  ===> ', () => {
  it('Saving experience details api', done => {
    supertest(app)
      .post(`/v1/profile/save-experience`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        experiences: [
          {
            durationFrom: 'sdsd',
            durationTo: 'vvvv',
            typeOfEngagement: 'sfs',
            jobTitle: 'sdfg',
            businessFunction: 'sdefg',
            companyName: 'sfdse',
            companyIndustryLine: 'dsgdg',
            companySize: '100',
            locationCountry: 'ddd',
            locationCity: 'esdftg',
            mainResponsibility: 'sfs',
            peopleManagementResponsibility: 'fsdf',
            managedTeamSize: 100,
            budgetResponsibility: 152,
            locationState: 'sdfbsh',
          },
        ],
        projects: [
          {
            engagementFrom: 'dffgd',
            engagementTo: 'dfds',
            engagementAs: 'sdf',
            projectName: 'sdfd',
            clientsCompanyName: 'feew',
            companyIndustryLine: 'sdfs',
            clientsCompanySize: '222',
            locationCountry: 'fsedf',
            locationCity: 'qqqq',
            businessFunction: 'fsdefs',
            projectGoal: 'sdgfsd',
            projectDuration: 'sedftge',
            projectSize: '111',
            projectComplexity: 'fegtf',
            projectRegionalReach: 'sdfsdfqq',
            role: 'safsd',
            projectTeamSize: 111,
            budgetResponsibility: 2315,
            mainResults: 'fdsds',
            applicableToOtherCompanies: 'dsfgdg',
            locationState: 'sdbcvsgavc',
          },
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
});
