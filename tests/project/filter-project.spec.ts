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
describe('testing project listing ', () => {
  test('testing normal search', done => {
    got(`http://localhost:7000/v1/project/filter-project`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        // searchKey: 'test',
        // category: { $in: '5b6c04114d27ef4e82b47e7b' },
        // projectTitle: 'MusicMatch',
        category: {
          $in: ['5b598e0f746364417c569061'],
        },
        // subCategory: {
        //   $in: ['5b5f02cbb19b436977beb3e1', '5b5f02cbb19b436977beb3e1'],
        // },
        // industryLine: {
        //   $in: ['5b5f02cbb19b436977beb3e1', '5b5f02cbb19b436977beb3e1'],
        // },
        // businessFunctions: {
        //   $in: ['5b5f02cbb19b436977beb3e1'],
        // },
        // technology: 'Informaton technology',
        // effort: 'Low (< 20 days)',
        // price: 20000,
        // impact: ['Procurement Saving', 'Test impact 2'],
        // referenceClientTypes: 'Small',
        // referenceProjectDate: '2018-03-31T18:30:00.000Z',
        // referenceCountry: 'Canada',
        // referenceLanguage: 'fr',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
