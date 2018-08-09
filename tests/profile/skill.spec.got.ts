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

describe('Test for skills ', () => {
  test('saving skill api', done => {
    got(`http://localhost:7000/v1/profile/save-skills`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        skills: [
          {
            cluster: 'Personal',
            category: '5b4f0845b48361468f85033c',
            subCategory: '5b4f0845b48361468f85033c',
            proficiency: 'Excellent',
            skillTitle: 'assasasa',
          },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Saving skill api - same user', done => {
    got(`http://localhost:7000/v1/profile/save-skills`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        skills: [
          {
            cluster: 'Personal',
            category: '5b4f0845b48361468f85033c',
            subCategory: '5b4f0845b48361468f85033c',
            proficiency: 'Excellent',
            skillTitle: 'assasasa',
          },
          {
            cluster: 'Functional',
            category: '5b4f0845b48361468f85033c',
            subCategory: '5b4f0845b48361468f85033c',
            proficiency: 'Excellent',
            skillTitle: 'assasasa',
            description: 'cccc',
            certificate: 'rerwtyetry',
            lastApplied: 2005,
          },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
