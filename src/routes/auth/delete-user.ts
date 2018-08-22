import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';
import { TempUser } from '../../models/TempUser';

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const userFound = await User.findOne(req.query.condition)
      .lean()
      .exec();
    let newEmail = '';
    if (userFound) {
      newEmail = userFound.email;
    }
    const tempRemove = TempUser.remove({ email: newEmail }).exec();
    const userRemove = User.remove(req.query.condition).exec();
    await BluePromise.all([tempRemove, userRemove]);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
