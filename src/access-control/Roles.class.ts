/* tslint:disable:max-classes-per-file */
import { Request, Response } from 'express';

abstract class BaseUserRoles {
  /** root users (developers) has the highest priority. Access everywhere */
  public static readonly ROOT = 'root';
  /** root > super-admin */
  public static readonly SUPER_ADMIN = 'super-admin';
  /** super-admin > business-analyst */
  public static readonly BUSINESS_ANAL = 'super-admin';
  /** super-admin > business-performance-manager */
  public static readonly BUSINESS_PERF = 'super-admin';
  /** super-admin > client-manager */
  public static readonly CLIENT_MANAGER = 'super-admin';
  public static readonly CONSULTANT = 'super-admin';
  public static readonly EMPLOY = 'super-admin';
  /** not `CONSULTANT`/`EMPLOY`, prior to that stage */
  public static readonly USER = 'user';
}

abstract class UserGroups extends BaseUserRoles {
  /** full access to authenticated users */
  public static readonly AUTHENTICATED_USERS: string[] = [
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
  public static readonly ADMINS: string[] = [
    BaseUserRoles.ROOT,
    BaseUserRoles.SUPER_ADMIN,
    BaseUserRoles.BUSINESS_ANAL,
    BaseUserRoles.BUSINESS_PERF,
    BaseUserRoles.CLIENT_MANAGER,
  ];

  /** consultant and employ */
  public static readonly CONS_EMP: string[] = [
    BaseUserRoles.ROOT,
    BaseUserRoles.CONSULTANT,
    BaseUserRoles.EMPLOY,
  ];
}

export class Roles extends UserGroups {
  /** access to anyone */
  public static ALL: string[] = ['all'];
}

/**
 * interface definitions
 */

interface IFields {
  /** who are allowed to access */
  allow?: string[];
  /**
   * custom access control: if `true` returns, acl passed. else failed.
   * !IMPORTANT. avoid ending response inside this fn by calling `res.send(..)` or `.end(..)` etc.
   */
  customAccessControl?: (req?: Request, res?: Response) => Promise<boolean>;
}
export interface IPermissionDefinition {
  [key: string]: IFields;
}
