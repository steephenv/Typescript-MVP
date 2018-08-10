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

describe('Test for project searching api', () => {
  test('searching project api', done => {
    got(`http://localhost:7000/v1/project/filter-project`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        searchKey: 'music',
        // userId: '5b63fecaa63cbe3329b0aa7c',
        // projectTitle: 'MusicMatch',
        // category: ['5b5f02cbb19b436977beb3e1'],
        // subCategory: ['5b598e0f746364417c569066'],
        // industryLine: [],
        // businessFunctions: ['5b5f02f67fdc3a69b2a98767'],
        // technology: 'tro',
        // effort: 'Low (< 20 days)',
        // price: 20000,
        // impact: 'Procurement Saving',
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
