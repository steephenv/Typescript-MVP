import { query } from 'express-validator/check';

export const getProjSubCategoryRules = [
  query('category')
    .exists()
    .withMessage('Invalid category'),
];
