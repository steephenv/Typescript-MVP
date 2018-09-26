import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { BusinessFunction } from '../../models/Business-function';
import { BusinessSubFunction } from '../../models/Business-sub-function';

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
      __v?: string;
      subFunctions?: Array<{
        name: string;
        _id?: string;
        __v?: string;
        businessFunctionId?: string;
      }>;
    }> =
      req.body.content;
    const result = await BluePromise.map(contents, async content => {
      delete content.__v;

      if (content._id) {
        // update
        const businessFunctionId = content._id;
        const subFns = content.subFunctions || [];

        delete content._id;
        delete content.subFunctions;

        return BluePromise.all([
          // update parent
          BusinessFunction.update({ _id: businessFunctionId }, content).exec(),
          // update child
          BluePromise.map(subFns, fn => {
            delete fn.__v;

            if (fn._id) {
              // update
              return BusinessSubFunction.update({ _id: fn._id }, fn).exec();
            } else {
              // create
              return BusinessSubFunction.create([
                {
                  name: fn.name,
                  businessFunctionId,
                },
              ]);
            }
          }),
        ]);
      } else {
        // create parent and keep _id
        const unique = content.name.trim().toLowerCase();

        const isExist = await BusinessFunction.findOne({
          uniqueName: unique,
        });
        if (isExist) {
          return next(
            new RequestError(
              RequestErrorType.CONFLICT,
              'Business Function Existing !!',
            ),
          );
        }
        let businessFn = new BusinessFunction({
          name: content.name,
          uniqueName: unique,
        });
        businessFn = await businessFn.save();
        return BluePromise.map(content.subFunctions || [], sf => {
          delete sf.__v;

          if (sf._id) {
            // update
            return BusinessSubFunction.update({ _id: sf._id }, sf).exec();
          } else {
            // create
            const bussSubFn = new BusinessSubFunction({
              name: sf.name,
              businessFunctionId: businessFn._id,
            });
            return bussSubFn.save();
          }
        });
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
  const unique = busFn.trim().toLowerCase();

  if (!extBusFn) {
    const newBusFn = new BusinessFunction({
      name: busFn,
      uniqueName: unique,
    });
    await newBusFn.save();
    return;
  }
}
