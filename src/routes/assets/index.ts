import * as express from 'express';
import * as queryIntParser from 'express-query-int';

import { errValidator } from '../../error-handler/error-validator';

import { recordAssets } from './record-assets';
import { listAssets } from './list-assets';

import { recordValidationChain } from './validators/record-assets.validation-chain';
import { listValidationChain } from './validators/list-assets.validation-chain';

export const assets = express.Router();

assets.get(
  '/',
  listValidationChain,
  errValidator,
  queryIntParser(),
  listAssets,
);
assets.post('/record', recordValidationChain, errValidator, recordAssets);
