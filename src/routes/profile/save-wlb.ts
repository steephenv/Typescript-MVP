import { RequestHandler } from 'express';

import { wlb } from '../../models/WLB';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveWLB: RequestHandler = async (req, res, next) => {
  try {
    const newData = new wlb({
      userId: req.params.userId,
      annualAvailableCapacity: req.body.annualAvailableCapacity,
      frequencyOnsiteWork: req.body.frequencyOnsiteWork,
      frequencyHomeOfficeWork: req.body.frequencyHomeOfficeWork,
      location: req.body.frequency,
      workpermit: req.body.workpermit,
    });
    const saved = await newData.save();
    // const criteria = {
    // };
    // await personalDetails.findOneAndUpdate(req.query, {
    //   $set: { criteria },
    // });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
