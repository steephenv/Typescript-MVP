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
describe('Test for saving education data ', () => {
  test('Saving Educational details api', done => {
    got(`http://localhost:7000/v1/profile/save-education`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        educations: [
          {
            durationFrom: '2005',
            durationTo: '2010',
            typeOfInstitution: 'degree',
            nameOfInstitution: 'hjhj',
            locationCountry: 'India',
            locationCity: 'gfhdsgh',
            locationState: 'gfhdsgh',
            stateIso: '222',
            major: 'daf',
            degree: 'sefge',
            grade: 'esfe',
            mainSubjects: [
              {
                subject: 'maths',
                grade: 'E',
              },
              {
                subject: 'english',
                grade: 'D',
              },
            ],
            activities: 'gsdgsd',
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
