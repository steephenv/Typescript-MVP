import { body } from 'express-validator/check';

export const createCategoryValidationChain = [
  body('category')
    .exists()
    .withMessage('Invalid category'),
];
