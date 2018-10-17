import { get as configGet } from 'config';

const FRONT_END_BASE_URL: string = configGet('frontEnd.web.baseUrl');

// const FRONT_END_BASE_URL = 'dsfsd';

const roleIcons: any = {
  UserEmployeeConsultant: [
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/dashboard`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Schedule-Interview',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/dashboard`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Import-profile',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/import-profile`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Complete-profile',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/complete-profile`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Review&Submit',
      redirectUrl: `${FRONT_END_BASE_URL}/#/interview/review`,
      iconUrl: 'http://example.img',
    },
  ],
  Client: [
    {
      name: 'Project-catalogs',
      redirectUrl: `${FRONT_END_BASE_URL}/#/project-catalogs`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Drafts',
      redirectUrl: `${FRONT_END_BASE_URL}/#/client/draft`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Proposal-request',
      redirectUrl: `${FRONT_END_BASE_URL}/#/client/proposal-request`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/client/dashboard`,
      iconUrl: 'http://example.img',
    },
  ],
  PM: [],
  BCM: [],
  BPM: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/dashboard`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Main Menu',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposa`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Me',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
      iconUrl: 'http://example.img',
    },
  ],
  Admin: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/dashboard`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Main Menu',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposa`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Me',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
      iconUrl: 'http://example.img',
    },
  ],
  Consultant: [
    {
      name: 'Home',
      redirectUrl: `${FRONT_END_BASE_URL}/#/home`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Dashboard',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/dashboard`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Main Menu',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/proposa`,
      iconUrl: 'http://example.img',
    },
    {
      name: 'Me',
      redirectUrl: `${FRONT_END_BASE_URL}/#/consultant/my-profile`,
      iconUrl: 'http://example.img',
    },
  ],

  Employee: [],
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
