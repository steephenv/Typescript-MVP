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
    .then(res => {
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Generate pdf of user details', () => {
  it(
    'pdf generation',
    done => {
      got(
        'http://localhost:7000/v1/profile/delete-admin-skill?skillId=5bce0a6fde79c44c369da3cf',
        {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`,
          },
          // json: true,
          // body: {
          //   username: 'stark@marvel.com',
          //   password: 'password',
          // },
        },
      )
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    800000,
  );
});
