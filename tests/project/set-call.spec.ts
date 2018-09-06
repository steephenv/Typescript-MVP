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

describe('Test for project share', () => {
  test('project share api', done => {
    got(`http://localhost:7000/v1/project/set-call`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        projectName: 'Test Project',
        userId: '5b9102c387c63b226223314c',
        timeForCall: '12.30-PM',
        otherDetails: '11-11-2018',
        mobile: '9544529886',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
