const Joi = require('joi');

const PersonalDataSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  middleName: Joi.string().required(),
});

const expSchema = Joi.object().keys({
  body: Joi.array()
    .items(PersonalDataSchema)
    .required(),
});

const data = {
  body: [
    { firstName: 'fdfd', middleName: 'ccc', mm: 'ggg' },
    { firstName: 'vvvv', middleName: 'c' },
  ],
};

Joi.validate(data, expSchema, { allowUnknown: true }, err => {
  if (err) {
    console.log('........', err);
  }
  console.log('mmmmmmm');
});
