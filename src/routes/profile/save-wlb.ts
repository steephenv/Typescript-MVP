import { RequestHandler } from 'express';

import { wlb } from '../../models/WLB';

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
    await wlb.remove({ userId: removeUserId });
    const newData = new wlb({
      userId: removeUserId,
      annualAvailableCapacity: req.body.annualAvailableCapacity,
      capriconsAvailableCapacity: req.body.capriconsAvailableCapacity,
      frequencyOnsiteWork: req.body.frequencyOnsiteWork,
      frequencyHomeOfficeWork: req.body.frequencyHomeOfficeWork,
      location: req.body.location,
      workpermit: req.body.workpermit,
    });
    await newData.save();
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
