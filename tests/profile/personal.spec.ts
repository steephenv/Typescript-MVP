import * as got from 'got';

let token = '';
let newUserId: string;

beforeAll(done => {
  got('http://localhost:7000/v1/auth/login', {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    json: true,
    body: {
      username: 'stark@marvel.com',
      password: 'password',
    },
  })
    .then(res => {
      newUserId = res.body.data._id;
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for personal data', () => {
  test('Saving personal details api', done => {
    got(`http://localhost:7000/v1/profile/save-personal-data`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        firstName: 'steephen',
        middleName: '',
        maidenName: 'maiden',
        lastName: 'varghese',
        image: 'dsacfcbcsa',
        birthDate: '31-3-4400',
        countryOfBirth: 'india',
        workPermit: 'dshjvdshv',
        professionalId: 'sdfbcshd',
        country: 'india',
        state: 'Kerala',
        city: 'Kottayam',
        street: 'kammalam',
        stateIso: 'yuuyuy',
        fixedLinePhone: '45212',
        mobilePhone: '9544529886',
        primaryEmail: 'steephenvrs3@gmail.com---',
        secondaryEmail: 'steefanvrs 3@gmail.com----',
        taxId: 'dfdgfjdnds',
        vatId: 51514,
        ibanNo: 'dvcbvdsahb',
        bicNo: 'bfghbdf',
        summary: 'sdehfsjhdfh',
        personalStatement: 'sdfbsdyhfgashbds',
      },
    })
      .then(() => done())
      .catch(err => {
        if (err.response.statusCode === 400) {
          return done();
        }
        throw err;
      });
  });
  test('Updating personal details api', done => {
    got(
      `http://localhost:7000/v1/profile/save-personal-data?userId=${newUserId}`,
      {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        json: true,
        body: {
          firstName: 'steephen',
          middleName: '',
          maidenName: 'maiden',
          lastName: 'varghese',
          image: 'dsacfcbcsa',
          birthDate: '31-3-4400',
          countryOfBirth: 'india',
          workPermit: 'dshjvdshv',
          professionalId: 'sdfbcshd',
          country: 'india',
          state: 'Kerala',
          city: 'Kottayam',
          street: 'chalaka',
          stateIso: 'yuuyuy',
          zipCode: '680721',
          fixedLinePhone: '45212',
          mobilePhone: '9544529886',
          primaryEmail: 'steephenvrs3@gmail.com',
          secondaryEmail: 'steefanvrs 3@gmail.com',
          taxId: 'dfdgfjdnds',
          vatId: 51514,
          ibanNo: 'dvcbvdsahb',
          bicNo: 'bfghbdf',
          summary: 'sdehfsjhdfh',
          personalStatement: 'sdfbsdyhfgashbds',
        },
      },
    )
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Saving personal details api - no  firstName', done => {
    got(`http://localhost:7000/v1/profile/save-personal-data`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        middleName: '',
        maidenName: 'maiden',
        lastName: 'varghese',
        image: 'dsacfcbcsa',
        birthDate: '31-3-4400',
        countryOfBirth: 'india',
        workPermit: 'dshjvdshv',
        professionalId: 'sdfbcshd',
        country: 'india',
        state: 'Kerala',
        city: 'Kottayam',
        street: 'kammalam',
        stateIso: 'yuuyuy',
        zipCode: '680721',
        fixedLinePhone: '45212',
        mobilePhone: '9544529886',
        primaryEmail: 'steephenvrs3@gmail.com',
        secondaryEmail: 'steefanvrs 3@gmail.com',
        taxId: 'dfdgfjdnds',
        vatId: 51514,
        ibanNo: 'dvcbvdsahb',
        bicNo: 'bfghbdf',
        summary: 'sdehfsjhdfh',
        personalStatement: 'sdfbsdyhfgashbds',
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
});
