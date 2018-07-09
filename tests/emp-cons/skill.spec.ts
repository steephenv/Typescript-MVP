/* eslint no-undef: 0 */

import * as supertest from 'supertest';
import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

let token = '';

describe('Test for skills  ===> ', () => {
    it('Login with all credentials', done => {
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
            token = res.body.accessToken;
            return done();
          });
      });
    it('Saving skill api', done => {
        supertest(app).post('/v1/profile/save-skills')
        .set({Authorization: `Bearer ${token}`})
        .send({
            skills: [
                {
                    cluster: 'Personal',
                    category: ' ',
                    subCategory: '',
                    skillTitle: 'assasasa',
                },
            ],
        })
        .expect(201)
        .end(err => {
            if (err) {
                throw err;
            }
            return done();
        });
    });
}
