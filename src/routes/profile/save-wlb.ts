import { RequestHandler } from 'express';

import { Wlb } from '../../models/WLB';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveWLB: RequestHandler = async (req, res, next) => {
  try {
    let removeUserId: string;
    if (req.query && req.query.userId) {
      removeUserId = req.query.userId;
    } else {
      removeUserId = res.locals.user.userId;
    }
    (req.body.userId = removeUserId),
      await Wlb.remove({ userId: removeUserId });
    const newData: any = new Wlb(req.body);
    newData.createdAt = new Date();
    newData.createdBy = res.locals.user.userId;
    newData.submitted = true;
    await newData.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
