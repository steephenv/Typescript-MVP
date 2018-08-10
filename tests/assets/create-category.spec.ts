import * as got from 'got';

describe('testing asset-category creation', () => {
  test('testing route', done => {
    got('http://localhost:7000/v1/assets/category', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        name: 'cat-name',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
