import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { ProjectEnvironment } from '../../models/ProjectEnvironment';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveProjectEnv: RequestHandler = async (req, res, next) => {
  try {
    // first delete users data, then re-create it.
    let removeUserId: string;
    if (req.query && req.query.userId) {
      removeUserId = req.query.userId;
    } else {
      removeUserId = res.locals.user.userId;
    }
    await ProjectEnvironment.remove({ userId: removeUserId });
    await BluePromise.map(req.body.stakeHolders, async (stakeHolder: any) => {
      stakeHolder.userId = removeUserId;
      stakeHolder.createdAt = new Date();
      //   stakeHolder.createdBy = res.locals.user.userId;
      //   stakeHolder.submitted = true;
      const newData = new ProjectEnvironment(stakeHolder);
      await newData.save();
      return;
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
