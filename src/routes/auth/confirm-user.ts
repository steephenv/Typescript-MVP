import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { TempUser } from '../../models/TempUser';
import { User } from '../../models/User';

import { messages } from '../../config/app/messages';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const confirmUser: RequestHandler = async (req, res, next) => {
  try {
    const twentyMinutesBefore = new Date();
    twentyMinutesBefore.setMinutes(twentyMinutesBefore.getMinutes() - 48);
    const criteria = {
      token: req.query.token,
      // createdAt: {
      //   $gte: new Date(twentyMinutesBefore),
      // },
    };
    const user: any = await TempUser.findOne(criteria)
      .lean()
      .exec();
    if (!user) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.noUser.ENG),
      );
    }

    const timeInterval =
      new Date().getTime() - new Date(user.createdAt).getTime();

    if (user && timeInterval > 2880000) {
      await TempUser.remove(criteria).exec();
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.timeOut.ENG),
      );
    }
    const extUser = await User.findOne({ email: user.email });
    if (extUser) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.emailExisting.ENG),
      );
    }
    if (!user) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, messages.noUser.ENG),
      );
    }
    delete user._id;
    const newUser = new User(user);
    await BluePromise.all([
      newUser.save(),
      TempUser.findOneAndRemove({
        email: req.body.email,
      }),
    ]);
    return res.status(201).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
