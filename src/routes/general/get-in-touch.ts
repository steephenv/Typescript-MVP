import { RequestHandler } from 'express';

// import { User } from '../../models/User';
import { getInTouchData } from '../../models/GetInTouch';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getInTouch: RequestHandler = async (req, res, next) => {
  try {
    const getData: any = new getInTouchData(req.body);
    await getData.save();
    return res.status(201).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
