import * as supertest from 'supertest';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

import { InterviewAvailabilityCalender } from '../../src/models/InterviewAvailabilityCalender';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

let token: string;
let availableSlot: any;

beforeAll(done => {
  supertest(app)
    .post('/v1/auth/login')
    .set('X-Requested-With', 'XMLHttpRequest')
    .send({
      username: 'stark@marvel.com',
      password: 'password',
    })
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        throw err;
      }
      token = res.body.accessToken;
      availableSlot = await InterviewAvailabilityCalender.find({
        booked: false,
      }).exec();
      return done();
    });
});

describe('Test for scheduling interview', () => {
  it('scheduling with correct data', done => {
    supertest(app)
      .post(`/v1/interview/schedule-interview`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        startTime: availableSlot[0].startTime,
        endTime: availableSlot[0].endTime,
        typeOfCall: 'Video',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
  it('re scheduling with correct data', done => {
    supertest(app)
      .post(`/v1/interview/schedule-interview`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        startTime: availableSlot[1].startTime,
        endTime: availableSlot[1].endTime,
        typeOfCall: 'Video',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });
});
