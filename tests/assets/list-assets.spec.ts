import * as got from 'got';

describe('testing asset listing', () => {
  test('testing normal search', done => {
    got('http://localhost:7000/v1/assets?fileName=mango', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   name: 'Acinonyx',
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });

  test('testing keyQuery search', done => {
    got(
      'http://localhost:7000/v1/assets?keyQuery=a&description=lorem ipsium doller sit',
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

  test('testing excludeUsers search', done => {
    got(
      'http://localhost:7000/v1/assets?keyQuery=a&exUserId=5b4f0845b48361468f85032c',
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
