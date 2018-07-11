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

describe('Test for saving education data  ===> ', () => {
  it('Saving personal details api', done => {
    supertest(app)
      .post(`/v1/profile/save-education`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        educations: [
          {
            durationFrom: '2005',
            durationTo: '2010',
            typeOfInstitution: 'degree',
            nameOfInstitution: 'hjhj',
            locationCountry: 'India',
            locationCity: 'gfhdsgh',
            major: 'daf',
            degree: 'sefge',
            grade: 'esfe',
            mainSubjects: 'dfsfrews',
            gradeOfMainSubjects: 'fsdfgs',
            activities: 'gsdgsd',
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
  it('Saving personal details api - same data', done => {
    supertest(app)
      .post(`/v1/profile/save-education`)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        educations: [
          {
            durationFrom: '2005',
            durationTo: '2010',
            typeOfInstitution: 'degree',
            nameOfInstitution: 'hjhj',
            locationCountry: 'India',
            locationCity: 'gfhdsgh',
            major: 'daf',
            degree: 'sefge',
            grade: 'esfe',
            mainSubjects: 'dfsfrews',
            gradeOfMainSubjects: 'fsdfgs',
            activities: 'gsdgsd',
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
