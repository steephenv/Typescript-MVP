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

describe('testing fetching user data', () => {
  test('fetching user data api', done => {
    got(`http://localhost:7000/v1/profile/list-user-data`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      // json: true,
      // body: {
      //   content: [
      //     {
      //       name: 'cat-business-fn',
      //       businessFunctionId: '5b4f0845b48361468f85033c',
      //     },
      //   ],
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
