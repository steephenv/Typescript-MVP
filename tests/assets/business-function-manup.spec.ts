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
  test('testing with nested sub fns', done => {
    got('http://localhost:7000/v1/assets/business-functions', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        content: [
          {
            name: 'cat-business-fns',
            subFunctions: [
              {
                name: 'sub-name',
              },
              {
                name: 'sub-name2',
              },
              {
                name: 'sub-name3',
              },
            ],
          },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });

  test('testing with nested sub fns(update)', done => {
    got('http://localhost:7000/v1/assets/business-functions', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        content: [
          {
            _id: '5b4f0845b48361468f85033c',
            name: 'cat-business-fns',
            subFunctions: [
              {
                name: 'sub-name',
                _id: '5b4f0845b48361468f85033c',
              },
              {
                name: 'sub-name2',
              },
              {
                name: 'sub-name3',
              },
            ],
          },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
