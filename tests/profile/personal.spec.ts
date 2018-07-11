import * as supertest from 'supertest';
import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

let token = '';
let newUserId: string;

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

beforeAll(done => {
  supertest(app)
    .post('/v1/auth/login')
    .set('X-Requested-With', 'XMLHttpRequest')
    .send({
      username: 'stark@marvel.com',
      password: 'password',
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      newUserId = res.body.data._id;
      token = res.body.accessToken;
      return done();
    });
});

describe('Test for personal data  ===> ', () => {
  it('Saving personal details api', done => {
    supertest(app)
      .post(`/v1/profile/save-personal-data`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        firstName: 'steephen',
        middleName: 'maliekkal',
        maidenName: 'maiden',
        userId: newUserId,
        lastName: 'varghese',
        image: 'dsacfcbcsa',
        birthDate: new Date(),
        countryOfBirth: 'india',
        citizenship: 'indian',
        workPermit: 'dshjvdshv',
        professionalId: 'sdfbcshd',
        country: 'india',
        city: 'chalakudy',
        street: 'kammalam',
        pinCode: '680721',
        houseNo: '13307',
        countryDialingCode: '91',
        cityDialingCode: '47',
        fixedLinePhone: '45212',
        mobilePhone: '9544529886',
        primaryEmail: 'steephenvrs3@gmail.com',
        secondaryEmail: 'steefanvrs 3@gmail.com',
        taxId: 'dfdgfjdnds',
        vatId: 'newUserId',
        socialInsuranceId: 'asbdasvdh',
        healthInsuranceType: 'fvhdsvhdvbfgs',
        healthInsurance: 'dfshvgdshb',
        ibanNo: 'dvcbvdsahb',
        bicNo: 'bfghbdf',
        summary: 'sdehfsjhdfh',
        personalStatement: 'sdfbsdyhfgashbds',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('Saving personal details api - no userId', done => {
    supertest(app)
      .post(`/v1/profile/save-personal-data`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        firstName: 'steephen',
        middleName: 'maliekkal',
        maidenName: 'maiden',
        lastName: 'varghese',
        image: 'dsacfcbcsa',
        birthDate: new Date(),
        countryOfBirth: 'india',
        citizenship: 'indian',
        workPermit: 'dshjvdshv',
        professionalId: 'sdfbcshd',
        country: 'india',
        city: 'chalakudy',
        street: 'kammalam',
        pinCode: '680721',
        houseNo: '13307',
        countryDialingCode: '91',
        cityDialingCode: '47',
        fixedLinePhone: '45212',
        mobilePhone: '9544529886',
        primaryEmail: 'steephenvrs3@gmail.com',
        secondaryEmail: 'steefanvrs 3@gmail.com',
        taxId: 'dfdgfjdnds',
        vatId: 'newUserId',
        socialInsuranceId: 'asbdasvdh',
        healthInsuranceType: 'fvhdsvhdvbfgs',
        healthInsurance: 'dfshvgdshb',
        ibanNo: 'dvcbvdsahb',
        bicNo: 'bfghbdf',
        summary: 'sdehfsjhdfh',
        personalStatement: 'sdfbsdyhfgashbds',
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
