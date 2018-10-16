const roleIcons = {
  BPM: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
  PM: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
  BCM: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
  Consultant: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
  Admin: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
  Employee: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
  User: {
    name: 'option1',
    redirectUrl: 'http://example.com',
    iconUrl: 'http://example.img',
  },
};

export function getRoleIconData(
  role: 'BPM' | 'PM' | 'BCM' | 'Consultant' | 'Admin' | 'Employee' | 'User',
) {
  return roleIcons[role];
}
