import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { BusinessFunction } from '../../models/Business-function';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const upsertBusinessFunction: RequestHandler = async (
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
        return BusinessFunction.update({ _id: id }, content).exec();
      } else {
        // create op
        const fn = new BusinessFunction(content);
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

export async function addBusinessFun(busFn: string) {
  const extBusFn: any = await BusinessFunction.findOne({
    name: busFn,
  }).exec();

  if (!extBusFn) {
    const newBusFn = new BusinessFunction({
      name: busFn,
    });
    await newBusFn.save();
    return;
  }
}
