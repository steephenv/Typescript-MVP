import { RequestHandler } from 'express';

import { PersonalDetails } from '../../models/PersonalDetails';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const savePersonal: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    if (req.query.userId) {
      where.userId = req.query.userId;
    } else {
      where.userId = res.locals.userId;
    }
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    if (req.query && req.query.userId) {
      await PersonalDetails.update(where, { $set: req.body });
    } else {
      req.body.createdAt = new Date();
      const personalDeta = new PersonalDetails(req.body);
      await personalDeta.save();
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
