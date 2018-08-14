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

describe('Test for Remove functionality', () => {
  test('Test for removing a record', done => {
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
              remove(condition:{_id:"5b712d1ce34e4518bba82073",type: "mango"})
            }
          }
        `,
        variables: {
          collName: 'Favorites',
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
