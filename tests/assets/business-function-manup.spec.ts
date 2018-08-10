import * as got from 'got';

describe('testing business-fn', () => {
  test('testing creation', done => {
    got('http://localhost:7000/v1/assets/business-functions', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: { content: [{ name: 'cat-business-fn' }] },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('testing update', done => {
    got('http://localhost:7000/v1/assets/business-functions', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        content: [{ _id: '5b4f0845b48361468f85033c', name: 'cat-business-fn' }],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
