import * as express from 'express';

// import * as queryBoolParser from 'express-query-boolean';
// import * as queryIntParser from 'express-query-int';

import { errValidator } from '../../error-handler/error-validator';

import { registerValidation } from './validators/register-rules';
import { loginRule } from './validators/login.rule';

import { registration } from './register';
import { login } from './login';
export const auth = express.Router();

auth.post('/register', registerValidation, registration);
auth.post('/login', loginRule, errValidator, login);
