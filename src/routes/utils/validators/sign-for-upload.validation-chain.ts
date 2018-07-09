import { body } from 'express-validator/check';
import * as Joi from 'joi';

const objectsToSignSchema = Joi.array().items(
  Joi.object().keys({
    fileName: Joi.string().required(),
    fileType: Joi.string().required(),
    filePath: Joi.string().optional(),
  }),
);

export const signForUploadValidator = [
  body('objectsToSign')
    .exists()
    .withMessage('Invalid objectsToSign field')
    .custom(value => {
      const { error } = Joi.validate(value, objectsToSignSchema);
      if (error) {
        throw new Error(
          JSON.stringify(
            { msg: 'Invalid objectsToSign field', error },
            null,
            2,
          ),
        );
      }
      return true;
    }),
];
