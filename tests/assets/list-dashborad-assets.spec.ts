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

describe('Test for getting single project details data', () => {
  test('getting single project details api', done => {
    got(`http://localhost:7000/v1/assets/dashboard-assets?modelType=viewed`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      // json: true,
      // body: {
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('getting single project details api', done => {
    got(
      `http://localhost:7000/v1/assets/dashboard-assets?modelType=downloaded`,
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        // json: true,
        // body: {
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
