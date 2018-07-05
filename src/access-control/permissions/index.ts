/**
 * SAMPLE FORMAT
 *
 * 'METHOD:/api-end-point': {
 * 		allow: ['super-admin', 'low-authority-admin', 'high-authority-admin', 'manufacturer', 'distributor'],
 * 		customAccessControl: custom-access-control-function,
 * },
 *
 *
 * DETAILS
 *
 * - Only the APIs listed here will be accessible. Others will be forbidden.
 * - METHOD should be capitalized.
 * - /api-end-point
 * 		- Only the part after '/api'.
 * 		- Requires a leading '/' but should not contain trailing '/'.
 * 		- RegEx can be used.
 * 			- Escape '\' with additional '\'. (Eg. 'GET:/profile/\\d+')
 * 			- To use parameters in customAccessControl function, enclose them in parenthesis.
 * 				(Eg. 'GET:/profile/(\\d+)')
 * - allow -> Required
 * 		- Values -> 'all', 'super-admin', 'low-authority-admin', 'high-authority-admin', 'manufacturer', 'distributor'
 * 		- Empty array -> No one has access
 * 		- allow: ['all'] -> Everybody has access
 * 		- allow: ['any-values-except-all'] -> Has access if userType exists in array. Implies authenticated users only.
 * - customAccessControl -> Optional
 * 		- If defined, this function will be executed even in case of allow: ['all'].
 * 		- A function with parameters req and res.
 * 		- Should return a promise that evaluates to true (has access) or false (forbidden).
 *
 */

import { IPermissionDefinition } from '../Roles.class';
import { auth } from './auth';

export const permissions: IPermissionDefinition = Object.assign(auth);
