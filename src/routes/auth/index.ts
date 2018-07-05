import * as express from 'express';

import { register } from './register';
import { registerValidation } from './validators/register-rules';

import { confirmUser } from './confirm-user';

import { forgotPasswordRules } from './validators/forgot-rules';
import { forgotPassword } from './forgot-password';

export const auth = express.Router();

auth.post('/register', registerValidation, register);
auth.post('/confirm', confirmUser);

auth.post('/forgot-password', forgotPasswordRules, forgotPassword);
