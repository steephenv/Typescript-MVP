import * as got from 'got';

describe('Test for confirm functionality ===> ', () => {
  it('Confirm user ', done => {
    got('http://localhost:7000/v1/auth/confirm?token=xxxxx', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   // name: 'cat-name',
      // },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(400);
        done();
      });
  });
});
