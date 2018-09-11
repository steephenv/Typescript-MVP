import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { Assets } from '../../models/Assets';
import { Share } from '../../models/share';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const shareAsset: RequestHandler = async (req, res, next) => {
  try {
    const data = await BluePromise.map(
      req.body.assetIds,
      async (assetsId: any) => {
        const asset = await Assets.findOne({ _id: assetsId });
        const assetShared = new Share({
          assetId: assetsId,
          type: 'asset',
          userId: res.locals.user.userId,
          sharedTo: req.body.sharedTo,
        });
        await assetShared.save();
        return asset;
      },
    );

    const mailOptions = {
      toAddresses: [req.body.sharedTo],
      template: EmailTemplates.SHARE_ASSET,
      fromName: 'Miwago Team',
      subject: `Shared Asset Link`,
      fields: {
        datas: data,
      },
    };

    await sendEmail(mailOptions);

    return res.status(201).send({
      success: true,
      msg: messages.emailSent.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
