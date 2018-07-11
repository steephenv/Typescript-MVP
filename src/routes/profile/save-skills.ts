import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Skills } from '../../models/Skills';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveSkills: RequestHandler = async (req, res, next) => {
  try {
    await Skills.remove({ userId: req.query.userId });

    await BluePromise.map(req.body.skills, (skill: any) => {
      skill.smallTitle = skill.skillTitle.trim().toLowerCase();
      const savableSkill = new Skills(skill);
      return savableSkill.save();
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
