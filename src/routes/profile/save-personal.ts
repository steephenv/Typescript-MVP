import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { PersonalDetails } from '../../models/PersonalDetails';
import { generateMiwagoUserId } from '../../utils/miwagoId-generator';

import { addNewCity } from '../../utils/add-new-city';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { messages } from '../../config/app/messages';

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
          messages.DuplicateSecondaryEmail,
        ),
      );
    }
    if (req.query && req.query.userId) {
      const updatePersonal = PersonalDetails.update(where, { $set: req.body });
      const citySave = addNewCity(req.body.stateIso, req.body.city);
      await BluePromise.all([updatePersonal, citySave]);
    } else {
      req.body.createdAt = new Date();
      req.body.createdBy = res.locals.user.userId;
      try {
        req.body.professionalId = await generateMiwagoUserId(req.body.city);
      } catch (err) {
        return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
      }
      const personalData = new PersonalDetails(req.body);
      const personalSave = personalData.save();
      const citySave = addNewCity(req.body.state, req.body.city);
      await BluePromise.all([personalSave, citySave]);
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
