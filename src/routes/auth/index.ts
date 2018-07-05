import * as express from 'express';

import { errValidator } from '../../error-handler/error-validator';

import { register } from './register';
import { registerValidation } from './validators/register-rules';

import { confirmUser } from './confirm-user';
import { confirmUserRule } from './validators/confirm-user.rule';

import { forgotPasswordRules } from './validators/forgot-rules';
import { forgotPassword } from './forgot-password';

import { listCompanyDetails } from './list-company-details';

import { emailRecoveryFunction } from './email-recovery';
import { recoveryEmailRules } from './validators/email-recovery-rules';

export const auth = express.Router();

auth.post('/register', registerValidation, register);
auth.post('/confirm', confirmUserRule, errValidator, confirmUser);

auth.post('/forgot-password', forgotPasswordRules, forgotPassword);

auth.get('/list-company-details', listCompanyDetails);

auth.post('/email_recovery', recoveryEmailRules, emailRecoveryFunction);
