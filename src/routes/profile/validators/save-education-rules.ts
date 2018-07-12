import * as Joi from 'joi';
import { RequestHandler } from 'express';

const subObjectSchema = Joi.object({
  Subject: Joi.string().required(),
  grade: Joi.string().required(),
});
const objectSchema = Joi.object({
  durationFrom: Joi.string().required(),
  durationTo: Joi.string().required(),
  typeOfInstitution: Joi.string().required(),
  nameOfInstitution: Joi.string().required(),
  locationCountry: Joi.string().required(),
  locationCity: Joi.string().required(),
  major: Joi.string().required(),
  degree: Joi.string().required(),
  grade: Joi.string().required(),
  mainSubjects: Joi.array().items(subObjectSchema),
  activities: Joi.string(),
}).required();

// tslint:disable:variable-name
const EducationSchema = Joi.object().keys({
  educations: Joi.array()
    .items(objectSchema)
    .min(1)
    .required(),
});
// const SubjectSchema = Joi.object().keys({
//   subjects: Joi.array()
//     .items(subObjectSchema)
//     .min(1)
//     .required(),
// });

export const educationValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    EducationSchema,
    { stripUnknown: true },
    (err: any) => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      next();
    },
  );
};
