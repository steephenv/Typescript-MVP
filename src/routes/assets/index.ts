import * as express from 'express';

import { errValidator } from '../../error-handler/error-validator';

import { recordAssets } from './record-assets';
import { recordValidationChain } from './validators/record-assets.validation-chain';

export const assets = express.Router();

assets.post('/record', recordValidationChain, errValidator, recordAssets);
