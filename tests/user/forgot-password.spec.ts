import * as got from 'got';

describe('Test for forgot-password functionality ===> ', () => {
  it('Login with incorrect credentials', done => {
    got('http://localhost:7000/v1/auth/forgot-password', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        email: 'loki@marvel.com',
        url: 'http://fasdfasd.com/token={token}',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
