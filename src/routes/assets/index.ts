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
import { upsertBusinessFunction } from './upsert-business-fn';
import { listBusinessFns } from './list-business-fn';
import { upsertBusinessSubFunction } from './upsert-business-sub-fn';
import { listBusinessSubFunction } from './list-business-sub-fn';

import { listBussSubFnRule } from './validators/list-buss-sub-fn.rule';
import { upsertBusinessSubFnRule } from './validators/upsert-business-sub-fn.rule';
import { upsertBusinessFnRule } from './validators/upsert-business-fn.rule';
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

// business functions
assets.post(
  '/business-functions',
  upsertBusinessFnRule,
  upsertBusinessFunction,
);
assets.get('/business-functions', listBusinessFns);

// business sub functions
assets.post(
  '/business-sub-functions',
  upsertBusinessSubFnRule,
  upsertBusinessSubFunction,
);
assets.get(
  '/business-sub-functions',
  listBussSubFnRule,
  errValidator,
  listBusinessSubFunction,
);
