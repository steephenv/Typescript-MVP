import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { BusinessSubFunction } from '../../models/Business-sub-function';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const upsertBusinessSubFunction: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const contents: Array<{
      name: string;
      _id: string;
    }> =
      req.body.content;

    const result = await BluePromise.map(contents, content => {
      if (content._id) {
        // update op
        const id = content._id;
        delete content._id;
        return BusinessSubFunction.update({ _id: id }, content).exec();
      } else {
        // create op
        const fn = new BusinessSubFunction(content);
        return fn.save();
      }
    });

    return res.status(200).send({
      status: 'success',
      result,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
