import * as got from 'got';

describe('Test for availability listing', () => {
  test(
    'list slots',
    done => {
      got(
        'http://localhost:7000/v1/interview/list-availability?date=2018-08-04&forward=false',
        {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          // json: true,
          // body: { content: [{ name: 'cat-business-fn' }] },
        },
      )
        .then(({ body }: any) => {
          const givenDate = new Date('2018-08-04');
          const data = body.data || [];
          if (!data.length) {
            return done();
          }

          const dates = data.map((d: any) => new Date(d._id));

          for (const date of dates) {
            if (date > givenDate) {
              throw new Error('not matching');
            }
          }
          done();
        })
        .catch(err => {
          throw err;
        });
    },
    70000,
  );
});
