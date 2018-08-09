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
    .then(res => {
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('testing fetching skill category', () => {
  test('fetching skill category data api', done => {
    got(
      `http://localhost:7000/v1/profile/get-skill-category?cluster=Personal`,
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        // json: true,
        // body: {
        //   content: [
        //     {
        //       name: 'cat-business-fn',
        //       businessFunctionId: '5b4f0845b48361468f85033c',
        //     },
        //   ],
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('fetching skill category data api', done => {
    got(
      `http://localhost:7000/v1/profile/get-sub-category?category=5b4f0845b48361468f85033c`,
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        // json: true,
        // body: {
        //   content: [
        //     {
        //       name: 'cat-business-fn',
        //       businessFunctionId: '5b4f0845b48361468f85033c',
        //     },
        //   ],
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('fetching skill category data api', done => {
    got(`http://localhost:7000/v1/profile/get-skill-category`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      // json: true,
      // body: {
      //   content: [
      //     {
      //       name: 'cat-business-fn',
      //       businessFunctionId: '5b4f0845b48361468f85033c',
      //     },
      //   ],
      // },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
  test('fetching skill sub category data api', done => {
    got(`http://localhost:7000/v1/profile/get-sub-category`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      // json: true,
      // body: {
      //   content: [
      //     {
      //       name: 'cat-business-fn',
      //       businessFunctionId: '5b4f0845b48361468f85033c',
      //     },
      //   ],
      // },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
});
