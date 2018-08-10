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

describe('Save skill category ', () => {
  test('Saving skills details api', done => {
    got(`http://localhost:7000/v1/profile/save-skills`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        skills: [
          {
            skillTitle: 'newSkill',
            proficiency: 'good',
            category: '5b4f0845b48361468f85033c',
            cluster: 'Personal',
            subCategory: '5b4f0845b48361468f85033c',
          },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Save skill category - Bad request', done => {
    got(`http://localhost:7000/v1/profile/save-skill-category`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        category: 'Adipoli',
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
  test('Update skills details api', done => {
    got(`http://localhost:7000/v1/profile/update-skill-category`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        category: 'Adipoli_new',
        _id: '5b4f0845b48361468f85033c',
        subCategories: [
          { subCategory: 'newAdiploi_neww', _id: '5b4f0845b48361468f85033c' },
          { subCategory: 'newwwwwwwww' },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
  test('Update skills details api', done => {
    got(`http://localhost:7000/v1/profile/update-skill-category`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        category: 'Adipoli',
        subCategories: [{ subCategory: 'newAdiploi' }],
      },
    })
      // .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(422);
        done();
      });
  });
});
