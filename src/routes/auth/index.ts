import * as express from 'express';

import { register } from './register';
import { registerValidation } from './validators/register-rules';

import { confirmUser } from './confirm-user';

export const auth = express.Router();

auth.post('/register', registerValidation, register);
auth.post('/confirm', confirmUser);
