import * as got from 'got';

describe('testing asset-category listing', () => {
  test('testing route', done => {
    got('http://localhost:7000/v1/assets/category', {
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
