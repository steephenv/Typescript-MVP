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
    .then(async res => {
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Save skill category ==> ', () => {
  it('Save skill category', done => {
    got('http://localhost:7000/v1/profile/delete-skill-category', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        model: 'category',
        // ids: [catSave._id],
        ids: ['5b4f0845b48361468f85033c'],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
