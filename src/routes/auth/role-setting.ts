import { RequestHandler } from 'express';
import * as sgMail from '@sendgrid/mail';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { secrets } from '../../config/credentials/secrets';
import { sendGTemplates } from '../../config/credentials/sendgrid-templates';

sgMail.setApiKey(secrets.sendGridKey);

import { User } from '../../models/User';

export const saveRole: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.isApproved) {
      await User.update(
        { _id: req.body.userId },
        { $set: { role: req.body.role } },
      );
    }
    const user = await User.findOne({ _id: req.body.userId })
      .lean()
      .exec();
    const msg: any = {
      to: user.email,
      from: 'miwago@cubettech.com',
      subject: 'Role Rejected',
      text: 'To inform the role rejection',
      html: '<p></p>',
      templateId: sendGTemplates.roleRejection,
      substitutionWrappers: ['%', '%'],
      substitutions: {
        user: user.firstName + ' ' + user.lastName,
        role: req.body.role,
      },
    };

    sgMail.send(msg);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
