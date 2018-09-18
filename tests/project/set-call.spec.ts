import * as got from 'got';

let token = '';

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
    .then(res => {
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for schedule call functionality ===> ', () => {
  it('Call schedule for project ', done => {
    got('http://localhost:7000/v1/project/set-call', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        startTime: 'Mon Sep 17 2018 15:00:00 GMT+0530 (India Standard Time)',
        endTime: 'Mon Sep 17 2018 18:00:00 GMT+0530 (India Standard Time)',
        hoursArray: [8, 9, 6, 7],
        offset: '+0200',
        mobile: '00000009999',
        projectName: 'dsfds',
        typeOfCall: 'project',
      },
    }).then(() => done());
    // .catch(err => {
    //   expect(err.response.statusCode).toBe(400);
    //   done();
    // });
  });

  it('Call schedule for project - invalid value', done => {
    got('http://localhost:7000/v1/project/set-call', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        startTime: 'Mon Sep 17 2018 15:00:00 GMT+0530 (India Standard Time)',
        endTime: 'Mon Sep 17 2018 18:00:00 GMT+0530 (India Standard Time)',
        hoursArray: ['egferwgter'],
        offset: '+0200',
        typeOfCall: 'project',
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
});
