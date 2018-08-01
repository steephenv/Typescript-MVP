import * as express from 'express';

import * as queryBoolParser from 'express-query-boolean';

import { errValidator } from '../../error-handler/error-validator';

import { registerValidation } from './validators/register-rules';
import { confirmUserRule } from './validators/confirm-user.rule';
import { forgotPasswordRules } from './validators/forgot-rules';
import { recoveryEmailRules } from './validators/email-recovery-rules';
import { loginRule } from './validators/login.rule';
import { resetPasswordValidation } from './validators/reset-password-rules';
import { listUsersValidation } from './validators/list-users.rule';
import { setRoleValidation } from './validators/role-setting-rules';
import { userSuggestionRule } from './validators/user-suggestion.rule';

import { register } from './register';
import { confirmUser } from './confirm-user';
import { forgotPassword } from './forgot-password';
import { listCompanyDetails } from './list-company-details';
import { emailRecoveryFunction } from './email-recovery';
import { login } from './login';
import { passwordReset } from './reset-password';
import { getCountries } from './get-countries';
import { getStates } from './get-countries';
import { getCities } from './get-countries';
import { getCountryDetails } from './get-countries';
import { listUsers } from './list-users';
import { saveRole } from './role-setting';
import { suggestUsers } from './user-suggestions';

export const auth = express.Router();

auth.post('/register', registerValidation, register);
auth.post('/confirm', confirmUserRule, errValidator, confirmUser);

auth.post('/forgot-password', forgotPasswordRules, forgotPassword);

auth.get('/list-company-details', listCompanyDetails);

auth.post('/email_recovery', recoveryEmailRules, emailRecoveryFunction);

auth.post('/login', loginRule, errValidator, login);
auth.post('/reset-password', resetPasswordValidation, passwordReset);
auth.get('/get-countries', getCountries);
auth.get('/get-states', getStates);
auth.get('/get-cities', getCities);
auth.get('/get-country-details', getCountryDetails);

auth.get(
  '/list-users/:page',
  listUsersValidation,
  queryBoolParser(),
  listUsers,
);
auth.post('/role-setting', setRoleValidation, saveRole);

auth.get('/suggest-users', userSuggestionRule, suggestUsers);
