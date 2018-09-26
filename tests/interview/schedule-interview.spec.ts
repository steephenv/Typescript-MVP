import * as got from 'got';

let token: string;
const availableSlot = [
  {
    startTime: 'Fri Sep 28 2018 08:00:00 GMT+0200',
    endTime: 'Fri Sep 28 2018 09:00:00 GMT+0200',
  },
  {
    startTime: '2018-08-27T03:30:00.000Z',
    endTime: '2018-08-27T04:30:00.000Z',
  },
];

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

describe('Test for scheduling interview', () => {
  it('scheduling with correct data', done => {
    got('http://localhost:7000/v1/interview/schedule-interview', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        startTime: availableSlot[0].startTime,
        endTime: availableSlot[0].endTime,
        typeOfCall: 'Video',
        platform: 'Skype',
        platformId: 'qqqqqqqq',
        timezone: 'Europe/Berlin',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });

  // it('re scheduling with correct data', done => {
  //   got('http://localhost:7000/v1/interview/schedule-interview', {
  //     method: 'POST',
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     json: true,
  //     body: {
  //       startTime: availableSlot[1].startTime,
  //       endTime: availableSlot[1].endTime,
  //       typeOfCall: 'Video',
  //       platform: 'Skype',
  //       platformId: 'qqqqqqqq',
  //     },
  //   })
  //     .then(() => done())
  //     .catch(err => {
  //       throw err;
  //     });
  // });
});
