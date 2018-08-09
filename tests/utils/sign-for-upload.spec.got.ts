import * as got from 'got';

const obj = [{ fileName: 'fasd', fileType: 'fasdf', filePath: 'afsf/fasdf/' }];
let token: string;

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
    .then(({ body }: any) => {
      token = body.accessToken;
      done();
    })
    .catch(err => {
      throw err;
    });
});

describe('testing sign-for-upload fn', () => {
  test('testing route with good requests', done => {
    got('http://localhost:7000/v1/utils/sign-for-upload', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        objectsToSign: obj,
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });

  test('testing route with null array', done => {
    got('http://localhost:7000/v1/utils/sign-for-upload', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        objectsToSign: [],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });

  test('testing route with null array', done => {
    got('http://localhost:7000/v1/utils/sign-for-upload', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        objectsToSign: [{ mango: 2 }],
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
});
