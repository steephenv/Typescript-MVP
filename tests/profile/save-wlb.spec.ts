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

describe('Test for saving wlb data ', () => {
  test('Saving wlb details api', done => {
    got(`http://localhost:7000/v1/profile/save-wlb`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        annualAvailableCapacity: 210,
        capricornsAvailableCapacity: 260,
        frequencyOnsiteWork: 2153,
        frequencyHomeOfficeWork: 1265,
        location: ['dsfhhjsd', 'sdfbhsd', 'dbfhbd'],
        workPermit: 'dsfdshj',
        daysInYear: 154,
        daysInCapricornsYear: 412,
        fileName: 'TestImage.png',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
