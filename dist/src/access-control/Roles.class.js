"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseUserRoles {
}
/** root users (developers) has the highest priority. Access everywhere */
BaseUserRoles.ROOT = 'root';
/** root > super-admin */
BaseUserRoles.SUPER_ADMIN = 'super-admin';
/** super-admin > business-analyst */
BaseUserRoles.BUSINESS_ANAL = 'super-admin';
/** super-admin > business-performance-manager */
BaseUserRoles.BUSINESS_PERF = 'super-admin';
/** super-admin > client-manager */
BaseUserRoles.CLIENT_MANAGER = 'super-admin';
BaseUserRoles.CONSULTANT = 'super-admin';
BaseUserRoles.EMPLOY = 'super-admin';
/** not `CONSULTANT`/`EMPLOY`, prior to that stage */
BaseUserRoles.USER = 'user';
class UserGroups extends BaseUserRoles {
}
/** full access to authenticated users */
UserGroups.AUTHENTICATED_USERS = [
    BaseUserRoles.ROOT,
    BaseUserRoles.SUPER_ADMIN,
    BaseUserRoles.BUSINESS_ANAL,
    BaseUserRoles.BUSINESS_PERF,
    BaseUserRoles.CLIENT_MANAGER,
    BaseUserRoles.CONSULTANT,
    BaseUserRoles.EMPLOY,
    BaseUserRoles.USER,
];
/** root, super-admin, business-(anal, perf), client-manager */
UserGroups.ADMINS = [
    BaseUserRoles.ROOT,
    BaseUserRoles.SUPER_ADMIN,
    BaseUserRoles.BUSINESS_ANAL,
    BaseUserRoles.BUSINESS_PERF,
    BaseUserRoles.CLIENT_MANAGER,
];
/** consultant and employ */
UserGroups.CONS_EMP = [
    BaseUserRoles.ROOT,
    BaseUserRoles.CONSULTANT,
    BaseUserRoles.EMPLOY,
];
class Roles extends UserGroups {
}
/** access to anyone */
Roles.ALL = ['all'];
exports.Roles = Roles;
