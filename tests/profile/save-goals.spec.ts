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

describe('Test for saving goals  ===> ', () => {
  it('Saving personal details api', done => {
    supertest(app)
      .post(`/v1/profile/save-goals`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        clientRating: 'Good',
        teamRating: 'Good',
        annualAvailableCapacity: 1,
        capricornsAvailableCapacity: 1,
        daysLeftInYear: 22,
        incomePerHour: '33',
        skillTargets: [
          { skillId: '5b4c658e32958459122535cb', targetProficiency: 'Good' },
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
