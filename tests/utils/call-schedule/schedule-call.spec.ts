import * as got from 'got';

describe('Test for confirm functionality ===> ', () => {
  it('Confirm user ', done => {
    got('http://localhost:7000/v1/utils/schedule-call', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        startTime: 'Mon Sep 17 2018 15:00:00 GMT+0530 (India Standard Time)',
        endTime: 'Mon Sep 17 2018 18:00:00 GMT+0530 (India Standard Time)',
        hoursArray: [15, 16, 17, 18],
        offset: '+0200',
        typeOfCall: 'project',
      },
    })
      .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(400);
        done();
      });
  });
});
