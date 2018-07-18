import { query } from 'express-validator/check';
import { Types } from 'mongoose';

const objectIdValidator = Types.ObjectId.isValid;

export const listValidationChain = [
  query('_limit')
    .isInt()
    .optional()
    .withMessage('Invalid _limit'),
  query('_skip')
    .isInt()
    .optional()
    .withMessage('Invalid _skip'),
  query('userId')
    .optional()
    .custom(val => {
      if (!objectIdValidator(val)) {
        throw new Error('Invalid userId');
      }
      return true;
    })
    .withMessage('Invalid userId'),
];
