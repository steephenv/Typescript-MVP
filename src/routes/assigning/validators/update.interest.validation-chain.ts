import { body } from 'express-validator/check';
import * as Joi from 'joi';

const reflectOnSchema = Joi.array().items(
  Joi.object().keys({
    assId: Joi.number().required(),
    nextState: Joi.string().required(),
    status: Joi.string().optional(),
  }),
);

export const updateInterestChain = [
  body('status')
    .exists()
    .withMessage('Invalid status'),
  body('assignmentId')
    .exists()
    .withMessage('Invalid phone_number'),
  body('assignmentId')
    .exists()
    .withMessage('Invalid currentState'),
  body('nextState')
    .exists()
    .withMessage('Invalid nextState'),
  body('reflectOn')
    .optional()
    .custom(value => {
      const { error } = Joi.validate(value, reflectOnSchema);
      if (error) {
        throw new Error(
          JSON.stringify({ msg: 'Invalid reflectOn field', error }, null, 2),
        );
      }
      return true;
    }),
];
