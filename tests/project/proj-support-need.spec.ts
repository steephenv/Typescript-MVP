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

describe('Test for saving education data  ===> ', () => {
  it('Saving education details api', done => {
    supertest(app)
      .post(`/v1/project/save-project-support`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        roleAndResponsibility: [
          {
            consultant: 'dsvsdvxz',
            requiredHeadCount: 7,
            mainResponsibility: 'vhbvjhsd',
            requiredRole: 'xcjhnb vuh',
            engagementEnd: new Date(),
            engagementStart: new Date(),
            reqCapacityInFTE: 'sdxvnsdjbv',
            reqCapacityWorkDays: ' sxzdhvchsdgv',
            confirmAvgCapacity: 'zxjh hcgsxvc',
            avgCapacityPerWeek: 'sdbjdskbvvds',
            travellingRequired: 'ncsbvgdc',
            onsiteAvailability: 'xjczhvshdv',
            travellingFrequency: 'dsnvjbhsdv',
            travellingToLocations: ['sxhbcs', 'scvghsa', 'xsdvjbs'],
          },
          {
            consultant: 'dfjgbfdj',
            requiredHeadCount: 4,
            mainResponsibility: 'asjfcvklsd',
            requiredRole: 'xcjhnb s',
            engagementEnd: new Date(),
            engagementStart: new Date(),
            reqCapacityInFTE: 'sdvbmklds',
            reqCapacityWorkDays: 'dsknvjkbds',
            confirmAvgCapacity: 'zxjhdvfbsdj',
            avgCapacityPerWeek: 'sdbjdskbvvds',
            travellingRequired: 'ncsbvgdc',
            onsiteAvailability: 'xjczhvshdv',
            travellingFrequency: 'dsnvjbhsdv',
            travellingToLocations: ['sxhbcs', 'scvghsa', 'xsdvjbs'],
          },
        ],
        skillsAndExperience: [
          {
            role: 'project manager',
            yearsOfProfessionalExp: '12',
            clientsIndustryExp: 'asfascv',
            clientsCompanyExp: 'xgvcssad',
            businessFunction: 'revstcjas',
            functional: ['sdacmnk', 'skcn', 'scdgh'],
            personal: ['chgsa', 'sgchy', 'sdckjhj'],
            leadership: ['ashcbvh', 'dvjhj', 'sdihsd'],
            entrepreneurship: ['hjsdgch', 'sadgsa', 'dshcgb'],
            desiredDailyRate: 2500,
            travellingExpensePercentage: '17%',
            proposalSelectionMode: 'sdhcgfsdygsdvd',
          },
          {
            role: 'developer',
            yearsOfProfessionalExp: '12',
            clientsIndustryExp: 'asfascv',
            clientsCompanyExp: 'xgvcssad',
            businessFunction: 'revstcjas',
            functional: ['sdacmnk', 'skcn', 'scdgh'],
            personal: ['chgsa', 'sgchy', 'sdckjhj'],
            leadership: ['ashcbvh', 'dvjhj', 'sdihsd'],
            entrepreneurship: ['hjsdgch', 'sadgsa', 'dshcgb'],
            desiredDailyRate: 1500,
            travellingExpensePercentage: '17%',
            proposalSelectionMode: 'sdhcgfsdygsdvd',
          },
          {
            role: 'designer',
            yearsOfProfessionalExp: '12',
            clientsIndustryExp: 'asfascv',
            clientsCompanyExp: 'xgvcssad',
            businessFunction: 'revstcjas',
            functional: ['sdacmnk', 'skcn', 'scdgh'],
            personal: ['chgsa', 'sgchy', 'sdckjhj'],
            leadership: ['ashcbvh', 'dvjhj', 'sdihsd'],
            entrepreneurship: ['hjsdgch', 'sadgsa', 'dshcgb'],
            desiredDailyRate: 500,
            travellingExpensePercentage: '17%',
            proposalSelectionMode: 'sdhcgfsdygsdvd',
          },
        ],
        clientsMessage: 'dsjbvhvz',
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
