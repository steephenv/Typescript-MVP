import * as express from 'express';

import { recordAssets } from './recod-assets';
// import { registerValidation } from './validators/register-rules';

export const assets = express.Router();

assets.post('/record', recordAssets);
