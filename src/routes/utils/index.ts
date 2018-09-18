import * as express from 'express';

import { errValidator } from '../../error-handler/error-validator';

import { signForUpload } from './sign-for-upload';
import { signForUploadValidator } from './validators/sign-for-upload.validation-chain';

export const utils = express.Router();

utils.post(
  '/sign-for-upload',
  signForUploadValidator,
  errValidator,
  signForUpload,
);
