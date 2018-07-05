import { body } from 'express-validator/check';

export const recordValidationChain = [
  body('name')
    .exists()
    .withMessage('Invalid name'),
  body('category')
    .exists()
    .withMessage('Invalid category'),
  body('attributes')
    .optional()
    .withMessage('Invalid attributes'),
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
    .exists()
    .withMessage('Invalid userId'),
];
