import { query } from 'express-validator/check';
import { Types } from 'mongoose';

const objectIdValidator = Types.ObjectId.isValid;

export const listSubCatRule = [
  query('categoryId')
    .optional()
    .custom(val => {
      if (!objectIdValidator(val)) {
        throw new Error('Invalid categoryId');
      }
      return true;
    })
    .withMessage('Invalid categoryId'),
];
