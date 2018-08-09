import * as got from 'got';

describe('test', () => {
  test('testing for humans', done => {
    got('http://localhost:7000/humans.txt', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   objectsToSign: obj,
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
