import * as got from 'got';

const keyEmail = 'loki1234@marvel.com';
const client1 = 'rdj1234@nnn.com';
let adminToken = '';

beforeAll(done => {
  got('http://localhost:7000/v1/auth/login', {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    json: true,
    body: {
      username: 'red@velvet.com',
      password: 'password',
    },
  })
    .then(res => {
      adminToken = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for signup functionality  ===> ', () => {
  it(
    'Registration Functionality',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: 'Loki',
          lastName: 'Asgard',
          email: keyEmail,
          password: 'australia',
          appliedRole: 'User',
          confirmPassword: 'australia',
          isDirectRegistration: false,
          url: 'dfsfsd?token={token}',
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
  it(
    'Testing local register of user with invalid data',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: '',
          lastName: 'ponding',
          email: 12345,
          password: 'australia',
          isDirectRegistration: false,
          mobile: '1234567890',
        },
      })
        // .then(() => done())
        .catch(err => {
          expect(err.response.statusCode).toBe(422);
          done();
        });
    },
    15000,
  );
  it(
    'Testing local register of user with existing email',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: 'ricky',
          lastName: 'ponding',
          email: 'keyEmail',
          isDirectRegistration: false,
          password: 'australia',
          mobile: '1234567890',
        },
      })
        // .then(() => done())
        .catch(err => {
          expect(err.response.statusCode).toBe(422);
          done();
        });
    },
    15000,
  );
  it(
    'Client registration',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: 'Tony',
          lastName: 'stark',
          email: client1,
          password: 'iamIron',
          confirmPassword: 'iamIron',
          appliedRole: 'Client',
          isDirectRegistration: false,
          callTime: new Date(),
          url: 'dfsfsd?token={token}',
          companyName: 'Stark Industries',
          mobile: '1234567890',
        },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );
  it(
    'Client registration - Without Company name',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: 'Tony',
          lastName: 'stark',
          email: client1,
          password: 'iamIron',
          confirmPassword: 'iamIron',
          isDirectRegistration: false,
          appliedRole: 'Client',
          callTime: '8 am',
          mobile: '1234567890',
        },
      })
        // .then(() => done())
        .catch(err => {
          expect(err.response.statusCode).toBe(422);
          done();
        });
    },
    15000,
  );
  it(
    'Client registration - Free email',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          firstName: 'Tony',
          lastName: 'stark',
          email: 'jj.gmail.com',
          password: 'iamIron',
          confirmPassword: 'iamIron',
          appliedRole: 'Client',
          callTime: '8 am',
          mobile: '1234567890',
        },
      })
        // .then(() => done())
        .catch(err => {
          expect(err.response.statusCode).toBe(422);
          done();
        });
    },
    15000,
  );
  it(
    'Client direct-registration',
    done => {
      got('http://localhost:7000/v1/auth/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${adminToken}`,
        },
        json: true,
        body: {
          firstName: 'Sid',
          lastName: 'stark',
          email: 'sid1234@cubettech.com',
          password: 'iamIron',
          confirmPassword: 'iamIron',
          role: 'Client',
          isDirectRegistration: true,
          url: 'dsfs',
          callTime: new Date(),
          companyName: 'Stark Industries',
          mobile: '1234567890',
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
