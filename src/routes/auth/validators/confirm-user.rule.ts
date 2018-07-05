import { query } from 'express-validator/check';

export const confirmUserRule = [
  query('token')
    .exists()
    .withMessage('Invalid token'),
];
