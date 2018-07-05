import { Roles, IPermissionDefinition } from '../Roles.class';

export const auth: IPermissionDefinition = {
  'GET:/auth/register': {
    allow: Roles.ALL,
  },
};
