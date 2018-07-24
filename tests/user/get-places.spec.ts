import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('places api  ===> ', () => {
  it(
    'get countries',
    done => {
      supertest(app)
        .get('/v1/auth/get-countries')
        .expect(200)
        .end(err => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    10000,
  );
  it('get states', done => {
    supertest(app)
      .get('/v1/auth/get-states?country=IN')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('get cities', done => {
    supertest(app)
      .get('/v1/auth/get-cities?state=IN-01')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it(
    'get country details',
    done => {
      supertest(app)
        .get('/v1/auth/get-country-details?countryName=India')
        .expect(200)
        .end(err => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    10000,
  );

  it(
    'get city from state name',
    done => {
      supertest(app)
        .get('/v1/auth/get-country-details?stateName=Encamp')
        .expect(200)
        .end(err => {
          if (err) {
            throw err;
          }
          return done();
        });
    },
    100000,
  );
});
