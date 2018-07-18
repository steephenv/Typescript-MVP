import { RequestHandler } from 'express';

import { Assets, IAssets } from '../../models/Assets';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const recordAssets: RequestHandler = async (req, res, next) => {
  try {
    await recordAssetsCtrl(req.body.assets);
    return res.status(201).send({
      msg: 'asset-recorded',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

async function recordAssetsCtrl(assets: IAssets) {
  const savable = new Assets(assets);
  await savable.validate();
  await savable.save();
  // need to send email
  return;
}
