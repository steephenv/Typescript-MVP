import { body } from 'express-validator/check';
import { Types } from 'mongoose';

const objectIdValidator = Types.ObjectId.isValid;

export const createSubCatValidationChain = [
  body('categoryId')
    .exists()
    .custom(val => {
      if (!objectIdValidator(val)) {
        throw new Error('Invalid userId');
      }
      return true;
    })
    .withMessage('Invalid categoryId'),
  body('subCategoryName')
    .exists()
    .withMessage('Invalid subCategoryName'),
];
