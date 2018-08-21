import * as got from 'got';

let token = '';
let newUserId = '';

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
      newUserId = body.data._id;
      done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for role set up functionality  ===> ', () => {
  it(
    'Role Accept',
    done => {
      got('http://localhost:7000/v1/auth/role-setting', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        json: true,
        body: {
          userId: newUserId,
          role: 'Consultant',
          isApproved: true,
          comment: 'fdsgf',
          loginUrl: 'fdsfds',
          interviewId: '5b506d48e618c7361b6a3977',
        },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );

  it(
    'Role Reject',
    done => {
      got('http://localhost:7000/v1/auth/role-setting', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        json: true,
        body: {
          userId: newUserId,
          role: 'Consultant',
          isApproved: false,
          comment: 'fdsgf',
          loginUrl: 'fdsfds',
          homeUrl: 'fdsfds',
          interviewId: '5b506d48e618c7361b6a3977',
        },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );
});
