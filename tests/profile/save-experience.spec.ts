import * as got from 'got';

let token = '';
let newUserId: string;

beforeAll(done => {
  got('http://localhost:7000/v1/auth/login', {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    json: true,
    body: {
      username: 'stark@marvel.com',
      password: 'password',
    },
  })
    .then(res => {
      newUserId = res.body.data._id;
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for saving experience data ', () => {
  test('Saving Experience details api', done => {
    got(`http://localhost:7000/v1/profile/save-experience`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        experiences: [
          {
            durationFrom: 'sdsd',
            durationTo: 'vvvv',
            typeOfEngagement: 'sfs',
            businessFunction: 'sdefg',
            companyName: 'sfdse',
            companyIndustryLine: 'dsgdg',
            companySize: '100',
            locationCountry: 'ddd',
            locationCity: 'esdftg',
            jobTitle: 'esdftg',
            stateIso: 'yuuyuy',
            mainResponsibility: 'sfs',
            peopleManagementResponsibility: 'fsdf',
            managedTeamSize: 100,
            budgetResponsibility: 152,
            locationState: 'sdfbsh',
            managementType: 'dsfsdgfs',
          },
        ],
        projects: [
          {
            engagementFrom: 'dffgd',
            engagementTo: 'dfds',
            engagementAs: 'sdf',
            clientsCompanyName: 'feew',
            companyIndustryLine: 'sdfs',
            clientsCompanySize: '222',
            locationCountry: 'fsedf',
            locationCity: 'qqqq',
            stateIso: 'yuuyuy',
            businessFunction: 'fsdefs',
            projectGoal: 'sdgfsd',
            projectName: 'sdgfsd',
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
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
