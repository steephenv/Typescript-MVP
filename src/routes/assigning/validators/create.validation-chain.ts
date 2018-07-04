import { body } from 'express-validator/check';

export const createValidationChain = [
  body('specialityDistributions')
    .exists()
    .custom(value => {
      if (value.constructor !== Array) {
        throw new Error('specialityDistributions is not an array');
      }
      value.map((specDistribution: any) => {
        if (specDistribution.specialities.constructor !== Array) {
          throw new Error(
            'specialityDistributions.specialities is not an array',
          );
        }
        if (specDistribution.distributors.constructor !== Array) {
          throw new Error(
            'specialityDistributions.distributors is not an array',
          );
        }
      });
      return true;
    }),
  body('manufacturer_id')
    .exists()
    .withMessage('Invalid manufacturer_id'),
  body('target_id')
    .exists()
    .withMessage('Invalid target_id'),
];
