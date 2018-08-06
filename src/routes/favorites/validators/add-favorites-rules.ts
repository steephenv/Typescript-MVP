import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const FavoritesSchema = Joi.object().keys({
  type: Joi.string().required(),
  collectionTypeId: Joi.string().required(),
});
export const saveFavoriteRule: RequestHandler = (req, res, next) => {
  //   req.body.role = res.locals.user.role;
  Joi.validate(req.body, FavoritesSchema, { stripUnknown: true }, err => {
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
