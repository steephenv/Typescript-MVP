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
describe('Delete project category ', () => {
  test('Delete project category', done => {
    got(`http://localhost:7000/v1/project/delete-category`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        model: 'category',
        ids: ['5b4f0845b48361468f85033c'],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Saving delete project favorite api', done => {
    got(`http://localhost:7000/v1/project/delete-project-favorite`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        items: [
          {
            type: 'project',
            projectsId: '5b6145a72a31c83e72c7fee3',
          },
          {
            type: 'project',
            projectsId: '5b68121c586dd83b039c3a7c',
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
