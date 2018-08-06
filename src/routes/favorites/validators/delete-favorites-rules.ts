import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const DeleteFavoritesSchema = Joi.object().keys({
  type: Joi.string().required(),
  collectionTypeId: Joi.string().required(),
});
export const deleteFavoriteRule: RequestHandler = (req, res, next) => {
  //   req.body.role = res.locals.user.role;
  Joi.validate(req.body, DeleteFavoritesSchema, { stripUnknown: true }, err => {
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
