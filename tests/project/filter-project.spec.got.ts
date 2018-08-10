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
describe('testing asset listing ', () => {
  test('testing normal search', done => {
    got(`http://localhost:7000/v1/assets?fileName=mango`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      // json: true,
      // body: {
      //   model: 'category',
      //   ids: ['5b4f0845b48361468f85033c'],
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('testing keyQuery search', done => {
    got(
      `http://localhost:7000/v1/assets?keyQuery=a&description=lorem ipsium doller sit`,
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        // json: true,
        // body: {
        //   model: 'category',
        //   ids: ['5b4f0845b48361468f85033c'],
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('testing excludeUsers search', done => {
    got(
      `http://localhost:7000/v1/assets?keyQuery=a&exUserId=5b4f0845b48361468f85032c`,
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        // json: true,
        // body: {
        //   model: 'category',
        //   ids: ['5b4f0845b48361468f85033c'],
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
