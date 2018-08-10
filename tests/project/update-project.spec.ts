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

describe('Test for project update', () => {
  test('project update api', done => {
    got(`http://localhost:7000/v1/project/update-project`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        projectId: '5b68364de25d265325ec54c3',
        projectTitle: 'MusicMatch',
        currentSituation: 'plan ind',
        targetSituation: 'Fully-fledged online music platform',
        targetGroup: 'all',
        category: '5b598e0f746364417c569061',
        subCategory: '5b598e0f746364417c569066',
        industryLine: '5b56deb462c159350a0b1166',
        businessFunctions: '5b597288be34302da22c7921',
        projectStages: 'Business Case',
        technology: 'tro',
        projectMaturity: 'Expertise',
        effort: 'Low (< 20 days)',
        price: 20000,
        impact: 'Procurement Saving',
        impactLevel: 'Medium',
        picture:
          'https://miwago-assets.s3.amazonaws.com/assets/profile_pics/SJpyjIdV7_wimbledon_aerial-tt.jpg',
        referenceIndustry: 'Manufacturing',
        referenceClientTypes: 'Small',
        referenceProjectDate: '2018-03-31T18:30:00.000Z',
        referenceCountry: 'Canada',
        referenceLanguage: 'fr',
        deliverables: 'deliverable 1',
        duration: '6 months',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  });
});
