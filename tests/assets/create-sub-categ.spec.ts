import * as got from 'got';

describe('testing asset-sub-category creation', () => {
  test('testing route', done => {
    got('http://localhost:7000/v1/assets/sub-category', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        categoryId: '5b4f0845b48361468f85033c',
        subCategoryName: 'felis',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
