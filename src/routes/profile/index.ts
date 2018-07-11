import * as express from 'express';
import * as multer from 'multer';
import * as userHome from 'user-home';

import { savePersonalRule } from './validators/save-personal-rule';
import { saveWLBRule } from './validators/save-wlb-rule';
import { educationValidation } from './validators/save-education-rules';
import { saveExperianceRule } from './validators/save-experiance-rules';

import { savePersonal } from './save-personal';
import { saveWLB } from './save-wlb';
import { linkData } from './link-data';
import { saveEducation } from './save-education';
import { getLinkedData } from './get-profile-data';
import { saveExperiance } from './save-experiance';

const upload = multer({ dest: userHome + '/uploads/' });

export const profile = express.Router();

profile.get('/list-data', getLinkedData);
profile.post('/save-personal-data', savePersonalRule, savePersonal);
profile.post('/save-education', educationValidation, saveEducation);
profile.post('/save-wlb', saveWLBRule, saveWLB);
profile.post('/save-experiance', saveExperianceRule, saveExperiance);
profile.post(
  '/link-data',
  upload.single('file'),
  (req, res, next) => {
    return next();
  },
  linkData,
);
