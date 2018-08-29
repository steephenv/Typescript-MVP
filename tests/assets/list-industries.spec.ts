import * as got from 'got';

describe('testing industry listing', () => {
  test('testing route', done => {
    got('http://localhost:7000/v1/assets/industries', {
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
    got('http://localhost:7000/v1/assets/industries?_limit=2', {
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
