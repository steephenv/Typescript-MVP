import * as Joi from 'joi';

// tslint:disable:variable-name
const GoalsSchema = Joi.object().keys({
  clientRating: Joi.string().required(),
  _id: Joi.string().optional(),
  userId: Joi.string().optional(),
  teamRating: Joi.string().required(),
  skillTargets: Joi.array()
    .items(
      Joi.object()
        .keys({
          skillId: Joi.object()
            .keys({ _id: Joi.string().required() })
            .required(),
          targetProficiency: Joi.string().required(),
        })
        .required(),
    )
    .optional(),
  educationalTargets: Joi.array().items(
    Joi.object().keys({
      durationFrom: Joi.string().optional(),
      activities: Joi.string().optional(),
      durationTo: Joi.string().optional(),
      typeOfInstitution: Joi.string().optional(),
      nameOfInstitution: Joi.string().optional(),
      locationCountry: Joi.string().optional(),
      locationCity: Joi.string().optional(),
      locationState: Joi.string().optional(),
      major: Joi.string().optional(),
      degree: Joi.string().optional(),
      grade: Joi.string().optional(),
      subject: Joi.string().optional(),
      subjectGrade: Joi.string().optional(),
    }),
  ),
  annualAvailableCapacity: Joi.number().required(),
  capricornsAvailableCapacity: Joi.number().required(),
  income: Joi.number().required(),
  incomePerMonth: Joi.string().required(),
  incomePerDay: Joi.string().required(),
  startDate: Joi.string().required(),
  remainingIncome: Joi.number().optional(),
  targetAnnualIncome: Joi.number(),
  targetAnnualIncomeCapricorns: Joi.number(),
});

export const updateValidator = (content: any) => {
  const { error } = Joi.validate(content, GoalsSchema, { stripUnknown: true });

  if (error) {
    return { errFound: true, error };
  }
  return { errFound: false };
};
