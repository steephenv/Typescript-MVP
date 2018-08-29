import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { EmailTemplates, sendEmail } from '../../email/send-email';

import { User } from '../../models/User';

export const setCall: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ role: 'Admin' })
      .lean()
      .exec();
    // console.log('user', user);
    const userDetails = await User.findById({ _id: req.body.userId })
      .lean()
      .exec();
    // console.log('userDetails', userDetails);
    const mailOptions = {
      toAddresses: [user.email],
      template: EmailTemplates.SET_CALL,
      fromName: 'Miwago Team',
      subject: `Set Admin Call`,
      fields: {
        user: userDetails.firstName + ' ' + userDetails.lastName,
        projectName: req.body.projectName,
        timeForCall: req.body.timeForCall,
        mobile: userDetails.mobile,
        otherDetails: req.body.otherDetails,
      },
    };
    await sendEmail(mailOptions);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
