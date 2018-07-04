import * as express from 'express';

import { register } from './register';
import { registerValidation } from './validators/register-rules';

export const auth = express.Router();

auth.post('/register', registerValidation, register);
