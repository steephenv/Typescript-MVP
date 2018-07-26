import { body } from 'express-validator/check';

export const createIndustryRule = [
  body('name')
    .exists()
    .withMessage('Invalid name for industries'),
];
