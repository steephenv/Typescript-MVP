import { RequestHandler } from 'express';

import { RequestError, RequestErrorType } from '../error-handler/RequestError';

import { permissions } from './permissions';

/**
 * A middleware to check if there are sufficient privileges to
 * complete the current request.
 *
 */
export const accessControl: RequestHandler = async (req, res, next) => {
  try {
    const tokenData = res.locals.user;
    let reqString = [req.method.toUpperCase(), req.path].join(':');
    // Remove trailing '/'
    reqString = reqString.replace(/\/+$/, '');

    // Permissions list not available
    if (!permissions) {
      return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
    }
    // Direct match for API not found in permissions list
    if (!permissions[reqString]) {
      // Look for RegEx match
      const regExMatch = Object.keys(permissions).some(key => {
        const regEx = new RegExp('^' + key + '$');
        if (regEx.test(reqString)) {
          res.locals.rawParams = reqString.match(regEx);
          reqString = key;
          return true;
        }
        return false;
      });
      // Return 404 error if route not listed in permissions
      if (!regExMatch) {
        return next(new RequestError(RequestErrorType.NOT_FOUND));
      }
    }

    const acl = permissions[reqString];

    // Allow not defined for API
    if (!acl.allow || typeof acl.allow !== 'object' || acl.allow.length < 1) {
      return next(new RequestError(RequestErrorType.FORBIDDEN));
    }

    // For APIs that doesn't require authentication
    if (acl.allow.indexOf('all') > -1) {
      if (
        !acl.customAccessControl ||
        (typeof acl.customAccessControl === 'function' &&
          (await acl.customAccessControl(req, res)))
      ) {
        return next();
      } else {
        return next(new RequestError(RequestErrorType.FORBIDDEN));
      }
    }

    // For APIs that require authentication
    if (!tokenData) {
      return next(new RequestError(RequestErrorType.LOGIN_FAILED));
    }
    if (acl.allow.indexOf(tokenData.userType) > -1) {
      if (
        !acl.customAccessControl ||
        (typeof acl.customAccessControl === 'function' &&
          (await acl.customAccessControl(req, res)))
      ) {
        return next();
      }
    }
    return next(new RequestError(RequestErrorType.FORBIDDEN));
  } catch (error) {
    return next(
      new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, error),
    );
  }
};
