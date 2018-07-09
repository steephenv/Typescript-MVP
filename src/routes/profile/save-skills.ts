import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Skills } from '../../models/Skills';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveSkills: RequestHandler = async (req, res, next) => {
  try {
    await BluePromise.map(req.body.skills, skill => {
      skill.smallTitle = skill.skillTitle.trim().toLowerCase();
      return Skills.update(
        { uniqueTitle: skill.smallTitle },
        { $set: { skill } },
        { upsert: true },
      );
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
