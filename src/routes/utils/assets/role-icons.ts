import { get as configGet } from 'config';

const FRONT_END_BASE_URL: string = configGet('frontEnd.web.baseUrl');

// const FRONT_END_BASE_URL = 'dsfsd';

const roleIcons: any = {
  UserEmployeeConsultant: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/home.svg',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/dashboard`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/dashboard.svg',
    },
    {
      name: 'Application',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/import-profile`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/my-application.svg',
    },
    {
      name: 'Interview',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/schedule`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/videocall.svg',
    },
  ],
  Client: [
    {
      name: 'Project-catalogs',
      redirectUrl: `${FRONT_END_BASE_URL}/#/project-catalogs`,
      // iconUrl: 'http://example.img',
    },
    {
      name: 'Drafts',
      redirectUrl: `${FRONT_END_BASE_URL}/#/client/draft`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/menu.svg',
    },
    {
      name: 'Proposal-request',
      redirectUrl: `${FRONT_END_BASE_URL}/#/client/proposal-request`,
      // iconUrl: 'http://example.img',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/client/dashboard`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/dashboard.svg',
    },
  ],
  PM: [],
  BCM: [],
  BPM: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/home.svg',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/admin/dashboard`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/dashboard.svg',
    },
    // {
    //   name: 'Main Menu',
    //   redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposal`,
    // iconUrl: 'http://example.img',
    // },
    // {
    //   name: 'Me',
    //   redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
    //   iconUrl: 'http://example.img',
    // },
  ],
  Admin: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/home.svg',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/admin/dashboard`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/dashboard.svg',
    },
    // {
    //   name: 'Main Menu',
    //   redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposa`,
    //   iconUrl: 'http://example.img',
    // },
    // {
    //   name: 'Me',
    //   redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
    //   iconUrl: 'http://example.img',
    // },
  ],
  Consultant: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/home.svg',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/dashboard`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/dashboard.svg',
    },
    // {
    //   name: 'Main Menu',
    //   redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposal`,
    //   iconUrl:
    //     'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/menu.svg',
    // },
    {
      name: 'Me',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/me.svg',
    },
  ],

  Employee: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/home.svg',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/dashboard`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/dashboard.svg',
    },
    // {
    //   name: 'Main Menu',
    //   redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposal`,
    //   iconUrl:
    //     'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/menu.svg',
    // },
    {
      name: 'Me',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
      iconUrl:
        'https://s3.eu-central-1.amazonaws.com/miwagoassets/icons/me.svg',
    },
  ],
  User: [],
};

export function getRoleIconData(
  role:
    | 'BPM'
    | 'PM'
    | 'BCM'
    | 'Consultant'
    | 'Admin'
    | 'Employee'
    | 'User'
    | 'UserEmployeeConsultant',
) {
  return roleIcons[role];
}
