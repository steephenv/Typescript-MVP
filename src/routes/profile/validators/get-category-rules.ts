import { query } from 'express-validator/check';

export const getCategoryRules = [
  query('cluster')
    .exists()
    .withMessage('Invalid cluster'),
];

export const getSubCategoryRules = [
  query('category')
    .exists()
    .withMessage('Invalid category'),
];
