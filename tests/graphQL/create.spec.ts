import * as got from 'got';

let token = '';
let newUserId = '';

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
      newUserId = body.data._id;
      done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for Create functionality', () => {
  test('Test for creating a record', done => {
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
              create(content:[{type: "mango",
               projectsId: "5b6145a72a31c83e72c7fee3",
               userId: "5b692c5e181ad1183c1d6982"}])
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
  test('Test for creating a record with _Options param', done => {
    got(`http://localhost:7000/v1/graph`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        query: `
        query Q($collName:String!, $createContent:Object!){
          collection(name:$collName){
            collectionName
            create(content:$createContent)
          }
        }
        `,
        variables: {
          collName: 'Favorites',
          createContent: [
            {
              _options: {
                skipIfExistingOnCondition: {
                  _id: '5b712d1ce34e4518bba82073',
                  type: 'mango',
                },
              },
              type: 'mango',
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
