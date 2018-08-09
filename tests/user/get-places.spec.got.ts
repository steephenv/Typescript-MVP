import * as got from 'got';

describe('places api  ===> ', () => {
  it(
    'get countries',
    done => {
      got('http://localhost:7000/v1/auth/get-countries', {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        // json: true,
        // body: {
        //   email: 'loki@marvel.com',
        //   url: 'http://fasdfasd.com/token={token}',
        // },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    10000,
  );
  it('get states', done => {
    got('http://localhost:7000/v1/auth/get-states?country=IN', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   email: 'loki@marvel.com',
      //   url: 'http://fasdfasd.com/token={token}',
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });

  it('get cities', done => {
    got('http://localhost:7000/v1/auth/get-cities?state=IN-01', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      // json: true,
      // body: {
      //   email: 'loki@marvel.com',
      //   url: 'http://fasdfasd.com/token={token}',
      // },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  it(
    'get country details',
    done => {
      got(
        'http://localhost:7000/v1/auth/get-country-details?countryName=India',
        {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          // json: true,
          // body: {
          //   email: 'loki@marvel.com',
          //   url: 'http://fasdfasd.com/token={token}',
          // },
        },
      )
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    10000,
  );

  it(
    'get city from state name',
    done => {
      got(
        'http://localhost:7000/v1/auth/get-country-details?stateName=Encamp',
        {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          // json: true,
          // body: {
          //   email: 'loki@marvel.com',
          //   url: 'http://fasdfasd.com/token={token}',
          // },
        },
      )
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    100000,
  );
});
