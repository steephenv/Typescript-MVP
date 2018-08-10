import * as got from 'got';

describe('testing asset recording', () => {
  test('testing route: update', done => {
    got('http://localhost:7000/v1/assets/record', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // .set('Authorization', `Bearer ${token}`)
      },
      json: true,
      body: {
        _id: '5b4f0845b48361468f85033c',
        title: 'fasdf',
        fileAccessUrls: ['fasdf'],
        fileName: 'adsfasd',
        userId: '5b4f0845b48361468f85033c',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('testing route: create', done => {
    got('http://localhost:7000/v1/assets/record', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // .set('Authorization', `Bearer ${token}`)
      },
      json: true,
      body: {
        title: 'fasdf',
        fileAccessUrls: ['fasdf'],
        fileName: 'adsfasd',
        userId: '5b4f0845b48361468f85033c',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
