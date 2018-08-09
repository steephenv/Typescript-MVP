import * as got from 'got';

describe('testing industry creation', () => {
  test('testing route', done => {
    got('http://localhost:7000/v1/assets/industries', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        name: 'Acinonyx',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
