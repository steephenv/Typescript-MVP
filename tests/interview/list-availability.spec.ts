import * as supertest from 'supertest';

import { app, mongoose, mongooseConnectionPromise } from '../../src/app';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('Test for availability listing', () => {
  test(
    'list slots',
    done => {
      supertest(app)
        .get('/v1/interview/list-availability?date=2018-08-04&forward=false')
        .set('X-Requested-With', 'XMLHttpRequest')
        .expect(200)
        .end((err, { body }) => {
          if (err) {
            throw err;
          }
          const givenDate = new Date('2018-08-04');

          const data = body.data;
          const dates = data.map((d: any) => new Date(d._id));

          for (const date of dates) {
            if (date > givenDate) {
              throw new Error('not matching');
            }
          }
          done();
        });
    },
    70000,
  );
});
