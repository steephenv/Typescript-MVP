import * as express from 'express';

// import * as queryBoolParser from 'express-query-boolean';
// import * as queryIntParser from 'express-query-int';

// import { errValidator } from '../../error-handler/error-validator';

import { getInTouchValidation } from './validators/get-in-touch-rule';
import { getInTouch } from './get-in-touch';

export const general = express.Router();

general.post('/get-in-touch', getInTouchValidation, getInTouch);
