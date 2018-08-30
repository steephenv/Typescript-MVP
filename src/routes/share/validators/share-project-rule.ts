import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const SharedSchema = Joi.object().keys({
  datas: Joi.array().required(),
  sharedTo: Joi.string().required(),
});
export const shareProjectRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, SharedSchema, { stripUnknown: true }, err => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
