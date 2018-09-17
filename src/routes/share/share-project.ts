import { RequestHandler } from 'express';

import { messages } from '../../config/app/messages';
import { EmailTemplates, sendEmail } from '../../email/send-email';
import { Promise as BluePromise } from 'bluebird';
import { Share } from '../../models/share';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const shareProject: RequestHandler = async (req, res, next) => {
  try {
    const mailOptions = {
      toAddresses: [req.body.sharedTo],
      template: EmailTemplates.SHARE_PROJECT,
      fromName: 'Capricorns Team',
      subject: `Share Project Link`,
      fields: {
        datas: req.body.datas,
      },
    };

    await sendEmail(mailOptions);

    const details = await BluePromise.map(req.body.datas, async (data: any) => {
      const projectShared = new Share({
        projectId: data.projectId,
        type: 'project',
        userId: res.locals.user.userId,
        sharedLink: data.url,
        sharedTo: req.body.sharedTo,
      });
      await projectShared.save();
      return projectShared;
    });

    return res.status(201).send({
      success: true,
      msg: messages.emailSent.ENG,
      data: details,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
