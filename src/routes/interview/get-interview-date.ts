import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Interview } from '../../models/Interview';

export const getInterviewDate: RequestHandler = async (req, res, next) => {
  try {
    const comingUserId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    const interview = await Interview.findOne({ userId: comingUserId })
      .populate('slot')
      .exec();
    return res.status(200).send({
      success: true,
      data: interview,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
