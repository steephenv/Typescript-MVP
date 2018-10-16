import * as got from 'got';
// import * as Joi from 'joi';

// const testData = [
//   {
//     name: 'hello',
//     hello: 'hai',
//   },
//   {
//     hello: 'hai',
//     name: 'hell',
//   },
// ];

// const objSchema: any = Joi.object().keys({
//   name: Joi.string().required(),
// });

// const objArraySchema = Joi.array().items(objSchema);

// Joi.validate(testData, objArraySchema, {}, err => {
//   console.log(err);
//   console.log('.............', testData);
//   if (err) {
//     console.log(err);
//   }
//   return;
//   // next();
// });

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
            mainResponsibility: 'sfs',
            peopleManagementResponsibility: 'fsdf',
            managedTeamSize: 100,
            budgetResponsibility: 152,
            locationState: 'sdfbsh',
            managementType: '5bc08938ac096344d60a9e6c',
          },
        ],
        projects: [
          {
            engagementFrom: 'dffgd',
            engagementTo: 'dfds',
            engagementAs: 'sdf',
            clientsCompanyName: 'feew',
            companyIndustryLine: 'sdfs',
            businessFunction: 'sdefg',
            clientsCompanySize: '222',
            locationCountry: 'fsedf',
            locationCity: 'qqqq',
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
  // test('Saving Experience details api - bad data', done => {
  //   got(`http://localhost:7000/v1/profile/save-experience`, {
  //     method: 'POST',
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     json: true,
  //     body: {
  //       experiences: [
  //         {
  //           businessFunction: 'sdefg',
  //           companyName: 'sfdse',
  //           companyIndustryLine: 'dsgdg',
  //           companySize: '100',
  //           locationCountry: 'ddd',
  //           locationCity: 'esdftg',
  //           jobTitle: 'esdftg',
  //           stateIso: 'yuuyuy',
  //           mainResponsibility: 'sfs',
  //           peopleManagementResponsibility: 'fsdf',
  //           managedTeamSize: 100,
  //           budgetResponsibility: 152,
  //           locationState: 'sdfbsh',
  //           managementType: 'dsfsdgfs',
  //         },
  //       ],
  //       projects: [
  //         {
  //           engagementFrom: 'dffgd',
  //           engagementTo: 'dfds',
  //           engagementAs: 'sdf',
  //           clientsCompanyName: 'feew',
  //           companyIndustryLine: 'sdfs',
  //           clientsCompanySize: '222',
  //           locationCountry: 'fsedf',
  //           locationCity: 'qqqq',
  //           stateIso: 'yuuyuy',
  //           projectGoal: 'sdgfsd',
  //           projectName: 'sdgfsd',
  //           projectDuration: 'sedftge',
  //           projectSize: '111',
  //           projectComplexity: 'fegtf',
  //           projectRegionalReach: 'sdfsdfqq',
  //           role: 'safsd',
  //           projectTeamSize: 111,
  //           budgetResponsibility: 2315,
  //           mainResults: 'fdsds',
  //           applicableToOtherCompanies: 'dsfgdg',
  //           locationState: 'sdbcvsgavc',
  //         },
  //       ],
  //     },
  //   })
  //     // .then(() => done())
  //     .catch(err => {
  //       // throw err;
  //       done(err);
  //     });
  // });
});
