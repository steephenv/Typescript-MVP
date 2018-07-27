import * as express from 'express';
import * as multer from 'multer';
import * as userHome from 'user-home';

import { errValidator } from '../../error-handler/error-validator';

import { savePersonalRule } from './validators/save-personal-rule';
import { saveWLBRule } from './validators/save-wlb-rule';
import { educationValidation } from './validators/save-education-rules';
import { saveExperienceRule } from './validators/save-experience-rules';
import { skillValidation } from './validators/save-skill-rule';
import { saveGoalRule } from './validators/save-goals-rules';
import { getCategoryRules } from './validators/get-category-rules';
import { getSubCategoryRules } from './validators/get-category-rules';
import { getSkillsRules } from './validators/skill-suggestions-rule';
import { updateSkillCategoryRules } from './validators/add-update-skill-category-rules';
import { saveSkillCategoryRules } from './validators/add-update-skill-category-rules';
import { deleteSkillCategoryRules } from './validators/delete-skill-category-rules';

import { savePersonal } from './save-personal';
import { saveWLB } from './save-wlb';
import { linkData } from './link-data';
import { saveEducation } from './save-education';
import { getLinkedData } from './get-profile-data';
import { saveExperience } from './save-experience';
import { saveSkills } from './save-skills';
import { getCategory } from './get-category';
import { getSubCategory } from './get-category';
import { saveGoals } from './save-goals';
import { skillsSuggestions } from './get-skills-suggestions';
import { getPrimaryUserData } from './get-primary-detail';
import { saveReviewStatus } from './save-review-status';
import { saveSkillCategory } from './add-skill-category';
import { updateSkillCategory } from './add-skill-category';
import { listAllSkillCategories } from './list-all-skill-categories';
import { deleteSkillCategory } from './delete-skill-categories';

const upload = multer({ dest: userHome + '/uploads/' });

export const profile = express.Router();

profile.get('/list-data', getLinkedData);
profile.post('/save-personal-data', savePersonalRule, savePersonal);
profile.post('/save-education', educationValidation, saveEducation);
profile.post('/save-wlb', saveWLBRule, saveWLB);
profile.post('/save-experience', saveExperienceRule, saveExperience);
profile.post('/save-skills', skillValidation, saveSkills);
profile.get('/get-skill-category', getCategoryRules, errValidator, getCategory);
profile.get('/list-user-data', getPrimaryUserData);
profile.get(
  '/skill-suggestions',
  getSkillsRules,
  errValidator,
  skillsSuggestions,
);
profile.get(
  '/get-sub-category',
  getSubCategoryRules,
  errValidator,
  getSubCategory,
);
profile.post('/save-goals', saveGoalRule, saveGoals);
profile.post(
  '/link-data',
  upload.single('file'),
  (req, res, next) => {
    return next();
  },
  linkData,
);
profile.get('/save-review-status', saveReviewStatus);

profile.post('/save-skill-category', saveSkillCategoryRules, saveSkillCategory);
profile.post(
  '/update-skill-category',
  updateSkillCategoryRules,
  updateSkillCategory,
);
profile.post(
  '/delete-skill-category',
  deleteSkillCategoryRules,
  deleteSkillCategory,
);
profile.get('/list-all-skill-categories', listAllSkillCategories);
