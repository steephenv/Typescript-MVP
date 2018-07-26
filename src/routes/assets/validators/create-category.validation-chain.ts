import { body } from 'express-validator/check';

export const createCategoryValidationChain = [
  body('name')
    .exists()
    .withMessage('Invalid name'),
];
