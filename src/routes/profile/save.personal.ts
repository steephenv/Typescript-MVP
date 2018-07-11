import { RequestHandler } from 'express';

import { PersonalDetails } from '../../models/PersonalDetails';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const savePersonal: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    if (req.query.personalDetailsId) {
      where._id = req.query.personalDetailsId;
    }

    req.body.updatedAt = new Date();
    if (req.query && req.query.personalDetailsId) {
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
