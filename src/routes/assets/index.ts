import * as express from 'express';
import * as queryIntParser from 'express-query-int';

import { errValidator } from '../../error-handler/error-validator';

import { recordAssets } from './record-assets';
import { listAssets } from './list-assets';
import { listAssetCategory } from './list-asset-category';
import { createAssetCategory } from './create-category';
import { createAssetSubCategory } from './create-sub-category';
import { listAssetSubCategory } from './list-sub-category';
import { listIndustries } from './list-industries';
import { createIndustries } from './create-industries';

import { recordValidationChain } from './validators/record-assets.validation-chain';
import { listValidationChain } from './validators/list-assets.validation-chain';
import { createCategoryValidationChain } from './validators/create-category.validation-chain';
import { createSubCatValidationChain } from './validators/create-asset-sub-category.rule';
import { listSubCatRule } from './validators/list-sub-category.rule';
import { createIndustryRule } from './validators/create-industry.rule';

export const assets = express.Router();

// asset main
assets.get(
  '/',
  listValidationChain,
  errValidator,
  queryIntParser(),
  listAssets,
);
assets.post('/record', recordValidationChain, errValidator, recordAssets);

// cat
assets.get('/category', listAssetCategory);
assets.post(
  '/category',
  createCategoryValidationChain,
  errValidator,
  createAssetCategory,
);

// sub cat
assets.post(
  '/sub-category',
  createSubCatValidationChain,
  errValidator,
  createAssetSubCategory,
);
assets.get('/sub-category', listSubCatRule, errValidator, listAssetSubCategory);

// industries
assets.get('/industries', listIndustries);
assets.post('/industries', createIndustryRule, errValidator, createIndustries);
