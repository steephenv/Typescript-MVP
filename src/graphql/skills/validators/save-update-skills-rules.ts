import * as Joi from 'joi';

const objectSchema = Joi.object({
  category: Joi.object().keys({
    _id: Joi.string().required(),
  }),
  subCategory: Joi.object().keys({
    _id: Joi.string().required(),
  }),
  skillTitle: Joi.string().required(),
  userId: Joi.string().optional(),
  proficiency: Joi.string().required(),
  cluster: Joi.string().required(),
  description: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
  certificates: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
  lastApplied: Joi.number().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
}).required();

// tslint:disable:variable-name
const SkillSchema = Joi.object().keys({
  skills: Joi.array()
    .items(objectSchema)
    .min(1)
    .required(),
});

export const updateValidator = (content: any) => {
  const { error } = Joi.validate(content, SkillSchema, { stripUnknown: true });
  if (error) {
    return { errFound: true, error };
  }
  return { errFound: false };
};
