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

describe('Test for Update functionality', () => {
  test('Test for Update functionality', done => {
    got(`http://localhost:7000/v1/graph`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        query: `
        query Q($coll: String!, $pipelines: Object!) {
            collection(name: $coll) {
              aggregate(query: $pipelines)
            }
          }
        `,
        variables: {
          coll: 'Assets',
          pipelines: [
            { $group: { _id: '$userId', length: { $sum: 1 } } },
            { $sort: { length: -1 } },
            { $limit: 10 },
            {
              $group: {
                _id: '0',
                userIds: { $push: '$_id' },
              },
            },
          ],
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
