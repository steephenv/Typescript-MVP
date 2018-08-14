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

describe('Test for Fetch functionality', () => {
  test('Test for fetch all records functionality', done => {
    got(`http://localhost:7000/v1/graph`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        query: `
        query Q($collName:String!){
          collection(name:$collName){
            collectionName
            fetch
          }
        }
        `,
        variables: {
          collName: 'Assets',
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Test for fetch records with conditions', done => {
    got(`http://localhost:7000/v1/graph`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        query: `
        query Q($collName:String!){
          collection(name:$collName){
            collectionName
            fetch(query: {_id: "5b3e0325d6973f4be3a2b84f"})
          }
        }
        `,
        variables: {
          collName: 'Assets',
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
