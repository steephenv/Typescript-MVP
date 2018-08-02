import { RequestHandler } from 'express';

import { Assets } from '../../models/Assets';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const recordAssets: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.userId) {
      req.body.userId = res.locals.user.userId;
    }

    if (!req.body.userId) {
      return next(
        new RequestError(
          RequestErrorType.UNPROCESSABLE_ENTITY,
          'no user Id in body or token',
        ),
      );
    }

    let resp: any;

    if (req.body._id) {
      const _id = req.body._id;
      delete req.body._id;

      resp = await Assets.update({ _id }, req.body);
    } else {
      resp = await recordAssetsCtrl(req.body);
    }

    return res.status(201).send({
      msg: 'asset-recorded',
      response: resp,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

async function recordAssetsCtrl(assets: any) {
  const savable = new Assets(assets);
  await savable.validate();
  const resp = await savable.save();
  // need to send email
  return resp;
}
