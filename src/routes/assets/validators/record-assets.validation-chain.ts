import { body } from 'express-validator/check';
import { Types } from 'mongoose';

const objectIdValidator = Types.ObjectId.isValid;

export const recordValidationChain = [
  body('title').optional(),
  body('fileAccessUrls')
    .optional()
    .custom(val => {
      if (val.constructor.name !== 'Array' || typeof val[0] !== 'string') {
        throw new Error('fileAccessUrls must be a string array');
      }
      return true;
    }),
  body('fileName').optional(),
  body('userId')
    .optional()
    .custom(val => {
      if (!objectIdValidator(val)) {
        throw new Error('Invalid userId');
      }
      return true;
    })
    .withMessage('Invalid userId'),
];
