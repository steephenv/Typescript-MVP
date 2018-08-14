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
        query Q($collName:String!, $condition:Object!, $content:Object!){
          collection(name:$collName){
            collectionName
            update(condition: $condition,content: $content)
          }
        }
        `,
        variables: {
          collName: 'Experience',
          condition: { _id: '5b6d7a41cba2a9275972e840' },
          content: { durationFrom: 'new duration' },
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Test for Updating a record with _Options param', done => {
    got(`http://localhost:7000/v1/graph`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        query: `
        query Q($collName:String!, $cond:Object!, $content:Object!, $options:Object!){
          collection(name:$collName){
            collectionName
            update(options: $options,condition: $cond,content: $content)
          }
        }
        `,
        variables: {
          collName: 'Favorites',
          options: {
            skipIfExistingOnCondition: {
              _id: '5b712d1ce34e4518bba82073',
              type: 'mango',
            },
          },
          cond: { _id: '5b6d7a41cba2a9275972e840' },
          content: { durationFrom: 'new duration' },
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
