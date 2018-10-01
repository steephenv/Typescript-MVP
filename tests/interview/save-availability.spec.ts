import * as got from 'got';

let token: string;
// const bpmId = '5b6c04094d27ef4e82b47e6b';

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
    .then(({ body }: any) => {
      token = body.accessToken;
      done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for availability save', () => {
  test(
    'creating slots',
    done => {
      got('http://localhost:7000/v1/interview/save-availability-calender', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        json: true,
        body: {
          dateRange: {
            startDate: 'Wed, 26 Sep 2018 00:00:00 GMT',
            endDate: 'Mon, 22 Oct 2018 00:00:00 GMT',
          },
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          workingTimeNumber: {
            startTime: 6,
            endTime: 18,
          },
          breakTimeNumber: {
            startTime: 11,
            endTime: 12,
          },
          timezone: 'Europe/Berlin',
          annualAvailability: 20,
        },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    80000,
  );
});
