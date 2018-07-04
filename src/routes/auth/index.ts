import * as express from 'express';

import { register } from './register';

export const auth = express.Router();

auth.post('/register', register);
