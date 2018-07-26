import { query } from 'express-validator/check';
import { Types } from 'mongoose';

const objectIdValidator = Types.ObjectId.isValid;

export const listBussSubFnRule = [
  query('businessFunctionId')
    .optional()
    .custom(val => {
      if (!objectIdValidator(val)) {
        throw new Error('Invalid businessFunctionId');
      }
      return true;
    })
    .withMessage('Invalid businessFunctionId'),
];
