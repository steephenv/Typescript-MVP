import * as express from 'express';

import { projectKeyParamRule } from './validators/project-key-param-rule';
import { projectSupportValidation } from './validators/project-support-need-rule';
import { projectEnvValidation } from './validators/project-env-rule';

import { saveProjectKeyParam } from './project-key-param';
import { saveProjectSupport } from './project-support-need';
import { saveProjectEnv } from './project-env';

export const project = express.Router();

project.post('/save-key-param', projectKeyParamRule, saveProjectKeyParam);
project.post(
  '/save-project-support',
  projectSupportValidation,
  saveProjectSupport,
);
project.post('/save-proj-env', projectEnvValidation, saveProjectEnv);
