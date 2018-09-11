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

describe('Test for project share', () => {
  test('project share api', done => {
    got(`http://localhost:7000/v1/project/share-project`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        datas: [
          {
            url: 'google.com',
            projectName: 'ProjectName1',
            projectId: '5b9788aac4e4f926c1fc2bbf',
          },
          {
            url: 'gmail.com',
            projectName: 'ProjectName2',
            projectId: '5b9788aac4e4f926c1fc2bbf',
          },
          {
            url: 'yahoo.com',
            projectName: 'ProjectName3',
            projectId: '5b9788aac4e4f926c1fc2bbf',
          },
        ],
        sharedTo: 'steephenvrs3@gmail.com',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
