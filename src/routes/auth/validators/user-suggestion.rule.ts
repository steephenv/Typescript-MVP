import { query } from 'express-validator/check';

export const userSuggestionRule = [
  query('role')
    .exists()
    .withMessage('Invalid role'),
  query('text')
    .exists()
    .withMessage('Invalid text'),
];
