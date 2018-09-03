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

describe('Suggest users api ===> ', () => {
  it('Suggestions for consultant', done => {
    got(
      'http://localhost:7000/v1/auth/suggest-users?role=Consultant&text=tony',
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
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
