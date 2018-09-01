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

describe('List users api', () => {
  test('Listing employees and consultants', done => {
    got(
      'http://localhost:7000/v1/auth/list-users?appliedRole=["Employee", "Consultant"]',
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

  it('profile data verified check', done => {
    got(
      'http://localhost:7000/v1/auth/list-users?appliedRole=["Employee", "Consultant"]&profileDataVerified=true',
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

  it('profile data verified check - user Id', done => {
    got(
      'http://localhost:7000/v1/auth/list-users?userId=5b894951534d207597078317',
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

  it('profile data verified check', done => {
    got(
      'http://localhost:7000/v1/auth/list-users?role=["Employee", "Consultant"]&profileDataVerified=true',
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
