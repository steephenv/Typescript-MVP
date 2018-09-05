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
        _id: '5b7d6431d0f39c5e9bf14d35',
        projectId: '5b8621e1c3dae018580c93f7',
        templateType: 'SkillBased',
        currentStatus: 'sadsad',
        currentSituation: 'sdfdsf',
        challengeType: 'cvdsjhgv',
        challenge: 'cbbxgcge',
        degreeOfChallenge: 'nxcdshgsa',
        goalValueAdd: 'ssdcvmnjas',
        projectName: 'Iron Man Series',
        desiredFutureSituation: 'sdjhysgdew',
        targetStart: new Date('2018-09-02'),
        expectedEnd: new Date('2018-09-06'),
        mainLocation: 'tehsdkvn',
        additionalLocations: ['location 1', ' location 2', 'location 3'],

        stakeHolders: [
          {
            stakeHolder: 'ascdkdvjhbiufwe',
            businessFunction: '5b8621e1c3dae018580c93f7',
            businessFunctionRole: 'ascdkdvjhbiufwe',
          },
          {
            stakeHolder: 'vhbfdhsmchd',
            businessFunction: '5b8621e1c3dae018580c93f7',
            businessFunctionRole: 'vhbfdhsmchd',
          },
        ],

        roleAndResponsibility: [
          {
            consultant: 'dsvsdvxz',
            requiredHeadCount: 7,
            mainResponsibility: 'vhbvjhsd',
            requiredRole: 'xcjhnb vuh',
            engagementEnd: new Date(),
            engagementStart: new Date(),
            reqCapacityInFTE: 'sdxvnsdjbv',
            reqCapacityWorkDays: 'sxzdhvchsdgv',
            confirmAvgCapacity: 'zxjh hcgsxvc',
            avgCapacityPerWeek: 'sdbjdskbvvds',
            travellingRequired: 'ncsbvgdc',
            onsiteAvailability: 'xjczhvshdv',
            travellingFrequency: 'dsnvjbhsdv',
            travellingToLocations: ['sxhbcs', 'scvghsa', 'xsdvjbs'],
          },
          {
            consultant: 'dfjgbfdj',
            requiredHeadCount: 4,
            mainResponsibility: 'asjfcvklsd',
            requiredRole: 'xcjhnb s',
            engagementEnd: new Date(),
            engagementStart: new Date(),
            reqCapacityInFTE: 'sdvbmklds',
            reqCapacityWorkDays: 'dsknvjkbds',
            confirmAvgCapacity: 'zxjhdvfbsdj',
            avgCapacityPerWeek: 'sdbjdskbvvds',
            travellingRequired: 'ncsbvgdc',
            onsiteAvailability: 'xjczhvshdv',
            travellingFrequency: 'dsnvjbhsdv',
            travellingToLocations: ['sxhbcs', 'scvghsa', 'xsdvjbs'],
          },
        ],
        skillsAndExperience: [
          {
            role: 'project manager',
            yearsOfProfessionalExp: '12',
            clientsIndustryExp: 'asfascv',
            clientsCompanyExp: 'xgvcssad',
            businessFunction: '5b8621e1c3dae018580c93f7',
            functional: ['Genius'],
            personal: ['chgsa', 'sgchy', 'sdckjhj'],
            leadership: ['ashcbvh', 'dvjhj', 'sdihsd'],
            entrepreneurship: ['hjsdgch', 'sadgsa', 'dshcgb'],
            desiredDailyRate: 2500,
            travellingExpensePercentage: '17%',
            proposalSelectionMode: 'sdhcgfsdygsdvd',
          },
          {
            role: 'developer',
            yearsOfProfessionalExp: '12',
            clientsIndustryExp: 'asfascv',
            clientsCompanyExp: 'xgvcssad',
            businessFunction: '5b8621e1c3dae018580c93f7',
            functional: ['sdacmnk', 'skcn', 'scdgh'],
            personal: ['chgsa', 'sgchy', 'sdckjhj'],
            leadership: ['ashcbvh', 'dvjhj', 'sdihsd'],
            entrepreneurship: ['hjsdgch', 'sadgsa', 'dshcgb'],
            desiredDailyRate: 1500,
            travellingExpensePercentage: '17%',
            proposalSelectionMode: 'sdhcgfsdygsdvd',
          },
          {
            role: 'designer',
            yearsOfProfessionalExp: '12',
            clientsIndustryExp: 'asfascv',
            clientsCompanyExp: 'xgvcssad',
            businessFunction: '5b8621e1c3dae018580c93f7',
            functional: ['sdacmnk', 'skcn', 'scdgh'],
            personal: ['chgsa', 'sgchy', 'sdckjhj'],
            leadership: ['ashcbvh', 'dvjhj', 'sdihsd'],
            entrepreneurship: ['hjsdgch', 'sadgsa', 'dshcgb'],
            desiredDailyRate: 500,
            travellingExpensePercentage: '17%',
            proposalSelectionMode: 'sdhcgfsdygsdvd',
          },
        ],
        clientsMessage: 'dsjbvhvz',
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
