import * as got from 'got';

describe('Test for direct-signup functionality  ===> ', () => {
  it(
    'Direct Registration Functionality',
    done => {
      got('http://localhost:7000/v1/auth/direct-register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: 'Lammaa',
          lastName: 'Asgard',
          email: 'lamma@yopmail.com',
          password: 'australia',
          appliedRole: 'Client',
          role: 'Client',
          companyName: 'Client',
          confirmPassword: 'australia',
          isDirectRegistration: true,
          isAssisted: true,
          callStartTime: '2018-12-10 04:30:00.000Z',
          callEndTime: '2018-12-10 06:30:00.000Z',
          mobile: '0987654321',
        },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );
});
