import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const SharedSchema = Joi.object().keys({
  sharedLink: Joi.array().required(),
  sharedTo: Joi.string().required(),
});
export const shareProjectRule: RequestHandler = (req, res, next) => {
  //   req.body.role = res.locals.user.role;
  Joi.validate(req.body, SharedSchema, { stripUnknown: true }, err => {
    // console.log();
    // delete req.body.role;
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
