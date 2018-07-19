import { RequestHandler } from 'express';

import { PersonalDetails } from '../../models/PersonalDetails';
import { generateMiwagoUserId } from '../../utils/miwagoId-generator';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const savePersonal: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    req.body.submitted = true;
    const secEmailCheck: any = { secondaryEmail: req.body.secondaryEmail };
    if (req.body.userId) {
      secEmailCheck.userId = { $ne: req.body.userId };
    }
    const userWithSameSecEmail = await PersonalDetails.count(secEmailCheck);
    if (userWithSameSecEmail > 0) {
      return next(
        new RequestError(
          RequestErrorType.CONFLICT,
          'Duplicate Secondary Email',
        ),
      );
    }
    if (req.query && req.query.userId) {
      await PersonalDetails.update(where, { $set: req.body });
    } else {
      req.body.createdAt = new Date();
      req.body.createdBy = res.locals.user.userId;
      try {
        req.body.professionalId = await generateMiwagoUserId(req.body.city);
      } catch (err) {
        return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
      }
      const personalData = new PersonalDetails(req.body);
      await personalData.save();
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
