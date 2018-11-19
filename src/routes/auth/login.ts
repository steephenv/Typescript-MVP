import { RequestHandler } from 'express';

import { User } from '../../models/User';
import { Jwt } from './utils/Jwt';
import { messages } from '../../config/app/messages';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const login: RequestHandler = async (req, res, next) => {
  try {
    req.body.username = (req.body.username as string).toLowerCase();
    const user: any = await User.findOne({ email: req.body.username }).exec();
    if (!user) {
      return next(
        new RequestError(RequestErrorType.LOGIN_FAILED, messages.noUser.ENG),
      );
    }

    const compare = await user.comparePassword(req.body.password);
    if (!compare) {
      return next(
        new RequestError(RequestErrorType.LOGIN_FAILED, messages.noUser.ENG),
      );
    }
    const accessToken = await Jwt.sign({
      userId: user._id,
      role: user.role,
      appliedRole: user.appliedRole,
    });
    return res.status(200).send({
      success: true,
      data: user,
      accessToken,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
