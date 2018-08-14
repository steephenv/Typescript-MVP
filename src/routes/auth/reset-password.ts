import { User } from '../../models/User';
import { ResetPassword } from '../../models/ResetPassword';

import { messages } from '../../config/app/messages';
import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const passwordReset: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new RequestError(
          RequestErrorType.BAD_REQUEST,
          messages.passwordMismatch.ENG,
        ),
      );
    }
    const twentyMinutesBefore = new Date();
    twentyMinutesBefore.setMinutes(twentyMinutesBefore.getMinutes() - 20);
    const criteria = {
      token: req.body.token,
      used: false,
      createdAt: {
        $gte: new Date(twentyMinutesBefore),
      },
    };
    const user = await ResetPassword.findOne(criteria)
      .lean()
      .exec();

    if (!user) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.timeOut.ENG),
      );
    }

    const newPassword = await bcrypt.hash(req.body.password, 10);

    const resetPasswordUpdate = ResetPassword.update(
      { token: req.body.token },
      { $set: { used: true } },
    ).exec();
    const userUpdate = User.update(
      {
        email: user.email,
      },
      {
        $set: {
          password: newPassword,
        },
      },
    ).exec();

    await BluePromise.all([resetPasswordUpdate, userUpdate]);

    return res.status(200).send({
      success: true,
      msg: messages.updated.ENG,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
