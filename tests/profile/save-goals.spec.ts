import * as got from 'got';

let token = '';
let newUserId: string;

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
      newUserId = res.body.data._id;
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for saving Goals data ', () => {
  test('Saving Goals details api', done => {
    got(`http://localhost:7000/v1/profile/save-goals`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        clientRating: 'Good',
        teamRating: 'Good',
        annualAvailableCapacity: 1,
        capricornsAvailableCapacity: 1,
        daysLeftInYear: 22,
        income: 33,
        incomePerAnnum: 4,
        incomePerMonth: '44',
        incomePerDay: '3',
        startDate: 'ddd',
        skillTargets: [
          { skillId: '5b4c658e32958459122535cb', targetProficiency: 'Good' },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
