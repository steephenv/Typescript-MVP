import * as got from 'got';
/* tslint:disable */
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

describe('Generate pdf of project details', () => {
  it(
    'pdf generation',
    done => {
      got(
        'http://localhost:7000/v1/project/generate-project-pdf?projectId=5b8621e1c3dae018580c93f7',
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
