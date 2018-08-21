import * as got from 'got';

describe('Test for deleting user ===> ', () => {
  it('Confirm user ', done => {
    got(
      'http://localhost:7000/v1/auth/delete/user?key=email&value=ll@yopmail.com',
      {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        // json: true,
        // body: {
        //   // name: 'cat-name',
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        // expect(err.response.statusCode).toBe(200);
        done();
      });
  });
});
