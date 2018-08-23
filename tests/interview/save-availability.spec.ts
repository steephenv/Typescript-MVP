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
            startDate:
              'Mon Aug 27 2018 05:30:00 GMT+0530 (India Standard Time)',
            endDate: '2018-08-30',
          },
          workingDays: ['Sunday', 'Monday', 'Tuesday', 'Thursday'],
          workingTime: {
            startTime:
              'Mon Jul 30 2018 09:00:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Jul 30 2018 18:00:00 GMT+0530 (India Standard Time)',
          },
          breakTime: {
            startTime:
              'Mon Jul 30 2018 13:00:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Jul 30 2018 14:00:00 GMT+0530 (India Standard Time)',
          },
          userId: '5b5ed5287630af443bcf2878',
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
