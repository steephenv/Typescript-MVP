import * as got from 'got';

let token = '';

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
    .then(({ body }: any) => {
      token = body.accessToken;
      done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Delete applicants api', () => {
  test('Delete applicants test', done => {
    got(
      'http://localhost:7000/v1/auth/delete-applicant?userId=5ba0998168809024f592297f',
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        // json: true,
        // body: {
        //   email: 'loki@marvel.com',
        //   url: 'http://fasdfasd.com/token={token}',
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
