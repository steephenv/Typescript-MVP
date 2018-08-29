import * as got from 'got';

describe('testing asset listing', () => {
  test('testing route', done => {
    got('http://localhost:7000/v1/assets/business-functions', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   name: 'Acinonyx',
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('testing route with limit', done => {
    got('http://localhost:7000/v1/assets/business-functions?_limit=1', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   name: 'Acinonyx',
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
