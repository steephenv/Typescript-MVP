import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { Education } from '../../models/Education';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveEducation: RequestHandler = async (req, res, next) => {
  try {
    // first delete users data, then re-create it.
    let removeUserId: string;
    if (req.query && req.query.userId) {
      removeUserId = req.query.userId;
    } else {
      removeUserId = res.locals.user.userId;
    }
    console.log(removeUserId);
    await Education.remove({ userId: removeUserId });
    await BluePromise.map(req.body.educations, async (education: any) => {
      education.userId = removeUserId;
      const newData = new Education(education);
      await newData.save();
      return;
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
