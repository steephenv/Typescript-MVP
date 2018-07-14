import { query } from 'express-validator/check';

export const getSkillsRules = [
  query('subCategory')
    .exists()
    .withMessage('Invalid subCategory'),
];
