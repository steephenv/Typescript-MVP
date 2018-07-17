import * as express from 'express';

import { projectKeyParamRule } from './validators/project-key-param-rule';

import { saveProjectKeyParam } from './project-key-param';

export const project = express.Router();

project.post('/save-key-param', projectKeyParamRule, saveProjectKeyParam);
