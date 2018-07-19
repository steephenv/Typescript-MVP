import { body } from 'express-validator/check';
import { Types } from 'mongoose';

const objectIdValidator = Types.ObjectId.isValid;

export const recordValidationChain = [
  body('name')
    .exists()
    .withMessage('Invalid name'),
  body('category')
    .exists()
    .withMessage('Invalid category'),
  body('attributes')
    .optional()
    .custom(val => {
      if (val.constructor.name !== 'Array' || typeof val[0] !== 'string') {
        throw new Error('attributes must be a string array');
      }
      return true;
    }),
  body('coAuthoring')
    .optional()
    .withMessage('Invalid coAuthoring'),
  body('accessUrl')
    .exists()
    .withMessage('Invalid accessUrl'),
  body('fileName')
    .exists()
    .withMessage('Invalid fileName'),
  body('fileType')
    .optional()
    .withMessage('Invalid fileType'),
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
