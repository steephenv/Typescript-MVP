import * as supertest from 'supertest';
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

describe('Test for saving project environment data  ===> ', () => {
  it('Saving project environment details api', done => {
    supertest(app)
      .post(`/v1/project/save-proj-env`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        stakeHolders: [
          {
            stakeHolder: 'ascdkdvjhbiufwe',
            businessFunction: 'ascdkdvjhbiufwe',
            businessFunctionRole: 'ascdkdvjhbiufwe',
            sponsorsPosition: 'ascdkdvjhbiufwe',
            managersPosition: 'ascdkdvjhbiufwe',
          },
          {
            stakeHolder: 'vhbfdhsmchd',
            businessFunction: 'vhbfdhsmchd',
            businessFunctionRole: 'vhbfdhsmchd',
            sponsorsPosition: 'vhbfdhsmchd',
            managersPosition: 'vhbfdhsmchd',
          },
        ],
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
