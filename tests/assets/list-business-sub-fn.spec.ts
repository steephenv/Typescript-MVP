import * as got from 'got';

describe('testing buss-sub-fn listing', () => {
  test('testing route', done => {
    got(
      'http://localhost:7000/v1/assets/business-sub-functions?businessFunctionId=5b4f0845b48361468f85033c',
      {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        // json: true,
        // body: {
        //   name: 'Acinonyx',
        // },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
