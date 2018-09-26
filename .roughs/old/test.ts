// tslint:disable:no-console

/**
 * sample file to test jobs
 * not required anywhere
 */

import { companyUpload } from './trigger';
import { userUpload } from './trigger';

companyUpload().then(status => console.log(status));

userUpload().then(status => console.log(status));

setInterval(() => console.log('chumma'), 2000);
