import * as express from 'express';

import { projectRequestRule } from './validators/project-request-rules';
import { saveProjectRule } from './validators/save-project-rules';
import { getProjSubCategoryRules } from './validators/get-proj-category-rules';

import { saveProjectRequest } from './project-request';
import { saveProject } from './save-project';
import { getProjectCategory } from './get-project-category';
import { getProjSubCategory } from './get-project-category';
import { getBusinessFunction } from './get-business-function';
import { getBusSubFunction } from './get-business-function';
import { getIndustryLine } from './get-industry-line';
export const project = express.Router();

project.post('/save-project-request', projectRequestRule, saveProjectRequest);
project.post('/save-project', saveProjectRule, saveProject);
project.get('/get-business-function', getBusinessFunction);
project.get('/get-business-sub-function', getBusSubFunction);
project.get('/get-project-category', getProjectCategory);
project.get('/get-industry-line', getIndustryLine);
project.get(
  '/get-proj-sub-category',
  getProjSubCategoryRules,
  getProjSubCategory,
);
