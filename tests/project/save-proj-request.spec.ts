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
      username: 'miwagoclient1@yopmail.com',
      password: '123456',
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

describe('Test for saving project request data ', () => {
  test('Saving project request details api with template 2 -1', done => {
    got(`http://localhost:7000/v1/project/save-project-request`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        formType: 'tab1',
        status: 'Request',
        consultantIds: [],
        additionalLocations: [],
        userId: '5b87e82b5e214a1da4d2cfdc',
        projectId: '5b8d1267973ee4696d108173',
        projectName: 'Resource Scheduler',
        templateType: 'DeliverableBased',
        stakeHolders: [
          {
            _id: '5b90f0f9e82fd25130734d45',
            businessFunction: '5b641aea9207a24034c921ae',
            businessFunctionRole: 'Project Steering',
          },
        ],
        roleAndResponsibility: [],
        skillsAndExperience: [],
        deliverables: [
          {
            nameOfDeliverables: 'gh',
            typeOfDeliverables: 'Strategy',
            languageOfDeliverable: 'German',
            briefDescriptionOfDeliverable: 'cfgh fg',
            expectedValueAddOfDeliverable: 'g hfgh fgh',
            expectedQualityOfDeliverable: ' fghfh  fcgfg',
            expectedDueDateOfDeliverable: '2018-09-09T18:30:00.000Z',
          },
        ],
        challenge: 'fghfh dfg fdgh fdgh',
        challengeType: 'Organizational Wise',
        communication: 'sq',
        currentSituation: 'hghgf h',
        currentStatus: 'Initializing',
        degreeOfChallenge: 'High',
        desiredFutureSituation: 'fgh fgdedfh gfhgfj ddrftg',
        expectedEnd: '2018-09-24T18:30:00.000Z',
        goalValueAdd: 'Analytics',
        mainLocation: 'Australia',
        submittedSections: {
          tab1: true,
          tab2: true,
          tab3: true,
        },
        targetStart: '2018-09-06T18:30:00.000Z',
        updatedAt: '2018-09-06T09:18:49.059Z',
        managersPosition: 'Project Lead',
        sponsorsPosition: 'Project Lead',
        clientsMessage: 'rtu tyu tyure rtyrtyt hgkjhk er ret rtyrt',
        expectedPricePerDeliverable: '€553.00',
        expectedPricePerDeliverableNumber: 553,
        expectedTotalPriceForValue: '€4,554.00',
        expectedTotalPriceForValueNumber: 4554,
        proposalSelectionBasedOn: 'Phone meeting',
        proposalSubmissionDate: '2018-09-18T08:00:19.000Z',
        travelExpPercentageOfTotalPriceForValue: '5345',
      },
    })
      .then(() => {
        // console.log('----------------------');
        done();
      })
      .catch(err => {
        // console.log(err);
        throw err;
      });
  });
  test.skip('Saving project request details api with NeedExpertAdvisory', done => {
    got(`http://localhost:7000/v1/project/save-project-request`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        status: 'Draft',
        _id: '5b7d6431d0f39c5e9bf14d35',
        projectId: '5b8621e1c3dae018580c93f7',
        templateType: 'NeedExpertAdvisory',
        topic: 'Test Topic',
        myAdvisoryNeed: ' test need for advisory',
        earliestStartDate: new Date(),
        latestDueDate: new Date(),
      },
    })
      .then(() => {
        // console.log('----------------------');
        done();
      })
      .catch(err => {
        // console.log(err);
        throw err;
      });
  });
  // test('Saving project request details api with template 1', done => {
  //   got(`http://localhost:7000/v1/project/save-project-request`, {
  //     method: 'POST',
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     json: true,
  //     body: {
  //       status: 'Draft',
  //       projectId: '5b72b04f814f7342d5874202',
  //       templateType: 'MakeDeliverable',
  //       currentStatus: 'sadsad',
  //       currentSituation: 'sdfdsf',
  //       challengeType: 'cvdsjhgv',
  //       challenge: 'cbbxgcge',
  //       degreeOfChallenge: 'nxcdshgsa',
  //       goalValueAdd: 'ssdcvmnjas',
  //       desiredFutureSituation: 'sdjhysgdew',
  //       targetStart: 'sdhfvgnxcb',
  //       expectedEnd: 'bcvhdsgftwesa',
  //       mainLocation: 'tehsdkvn',
  //       additionalLocations: 'nvsteddxsv',
  //       location2: 'AHDGBUYHASCV',
  //       location3: 'BCSYDGFYEWTC',
  //       location4: 'ZXBCHSAYHBSACC',
  //       communication: 'BCHSAFCAS',

  //       stakeHolders: [
  //         {
  //           stakeHolder: 'ascdkdvjhbiufwe',
  //           businessFunction: 'ascdkdvjhbiufwe',
  //           businessFunctionRole: 'ascdkdvjhbiufwe',
  //           sponsorsPosition: 'ascdkdvjhbiufwe',
  //           managersPosition: 'ascdkdvjhbiufwe',
  //         },
  //         {
  //           stakeHolder: 'vhbfdhsmchd',
  //           businessFunction: 'vhbfdhsmchd',
  //           businessFunctionRole: 'vhbfdhsmchd',
  //           sponsorsPosition: 'vhbfdhsmchd',
  //           managersPosition: 'vhbfdhsmchd',
  //         },
  //       ],
  //       noOfExpectedDeliverables: 'cshdgsdcsdv',
  //       nameOfDeliverables: 'cshdgsdcsdv',
  //       typeOfDeliverables: 'cshdgsdcsdv',
  //       languageOfDeliverable: 'cshdgsdcsdv',
  //       briefDescriptionOfDeliverable: 'cshdgsdcsdv',
  //       expectedValueAddOfDeliverable: 'cshdgsdcsdv',
  //       expectedQualityOfDeliverable: 'cshdgsdcsdv',
  //       expectedDueDateOfDeliverable: '3-4-2018',
  //       expectedTotalPriceForValue: '1254',
  //       expectedPricePerDeliverable: '3584',
  //       travelExpPercentageOfTotalPriceForValue: 'cshdgsdcsdv',
  //       proposalSelectionBasedOn: 'cshdgsdcsdv',
  //       clientsMessage: 'dsjbvhvz',
  //     },
  //   })
  //     .then(() => done())
  //     .catch(err => {
  //       throw err;
  //     });
  // });
  // test('Saving project request details api with template 3', done => {
  //   got(`http://localhost:7000/v1/project/save-project-request`, {
  //     method: 'POST',
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     json: true,
  //     body: {
  //       status: 'Draft',
  //       projectId: '5b72b04f814f7342d5874202',
  //       templateType: 'BuyDeliverable',
  //       currentStatus: 'sadsad',
  //       currentSituation: 'sdfdsf',
  //       challengeType: 'cvdsjhgv',
  //       challenge: 'cbbxgcge',
  //       degreeOfChallenge: 'nxcdshgsa',
  //       goalValueAdd: 'ssdcvmnjas',
  //       desiredFutureSituation: 'sdjhysgdew',
  //       targetStart: 'sdhfvgnxcb',
  //       expectedEnd: 'bcvhdsgftwesa',
  //       mainLocation: 'tehsdkvn',
  //       additionalLocations: 'nvsteddxsv',
  //       location2: 'AHDGBUYHASCV',
  //       location3: 'BCSYDGFYEWTC',
  //       location4: 'ZXBCHSAYHBSACC',
  //       communication: 'BCHSAFCAS',

  //       stakeHolders: [
  //         {
  //           stakeHolder: 'ascdkdvjhbiufwe',
  //           businessFunction: 'ascdkdvjhbiufwe',
  //           businessFunctionRole: 'ascdkdvjhbiufwe',
  //           sponsorsPosition: 'ascdkdvjhbiufwe',
  //           managersPosition: 'ascdkdvjhbiufwe',
  //         },
  //         {
  //           stakeHolder: 'vhbfdhsmchd',
  //           businessFunction: 'vhbfdhsmchd',
  //           businessFunctionRole: 'vhbfdhsmchd',
  //           sponsorsPosition: 'vhbfdhsmchd',
  //           managersPosition: 'vhbfdhsmchd',
  //         },
  //       ],
  //       languageOfDeliverable: 'cshdgsdcsdv',
  //       expectedDueDateOfDeliverable: '3-4-2018',
  //       proposalSubmissionDate: new Date(),
  //       proposalSelectionBasedOn: 'cshdgsdcsdv',
  //       clientsMessage: 'dsjbvhvz',
  //     },
  //   })
  //     .then(() => done())
  //     .catch(err => {
  //       throw err;
  //     });
  // });
});
