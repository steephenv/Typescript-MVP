import * as express from 'express';
import * as queryIntParser from 'express-query-int';

import { errValidator } from '../../error-handler/error-validator';

import { recordAssets } from './record-assets';
import { listAssets } from './list-assets';
import { listAssetCategory } from './list-asset-category';
import { createAssetCategory } from './create-category';
import { createAssetSubCategory } from './create-sub-category';

import { recordValidationChain } from './validators/record-assets.validation-chain';
import { listValidationChain } from './validators/list-assets.validation-chain';
import { createCategoryValidationChain } from './validators/create-category.validation-chain';
import { createSubCatValidationChain } from './validators/create-asset-sub-category.rule';

export const assets = express.Router();

assets.get(
  '/',
  listValidationChain,
  errValidator,
  queryIntParser(),
  listAssets,
);

assets.get('/category', listAssetCategory);
assets.post(
  '/category',
  createCategoryValidationChain,
  errValidator,
  createAssetCategory,
);
assets.post(
  '/sub-category',
  createSubCatValidationChain,
  errValidator,
  createAssetSubCategory,
);

assets.post('/record', recordValidationChain, errValidator, recordAssets);
