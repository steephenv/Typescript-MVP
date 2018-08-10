import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { Skills } from '../../models/Skills';
import { Goals } from '../../models/Goals';

export const deleteSkills: RequestHandler = async (req, res, next) => {
  try {
    const comingUserId = req.body.userId ? req.body.userId : res.locals.userId;

    const removeSkills = Skills.remove({ _id: { $in: req.body.ids } }).exec();
    const goalUpdate = Goals.update(
      { userId: comingUserId },
      {
        $pull: { skillTargets: { skillId: { $in: req.body.ids } } },
      },
      { safe: true, upsert: true },
    ).exec();

    const result = await BluePromise.all([goalUpdate, removeSkills]);
    return res.status(200).send({ success: true, result });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
