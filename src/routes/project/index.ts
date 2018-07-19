import * as express from 'express';

import { projectRequestRule } from './validators/project-request-rules';
// import { saveProjectRule } from './validators/save-project-rules';

import { saveProjectRequest } from './project-request';
// import { saveProject } from './save-project';

export const project = express.Router();

project.post('/save-project-request', projectRequestRule, saveProjectRequest);
// project.post('/save-project', saveProjectRule, saveProject);
