import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Skills } from '../../models/Skills';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveSkills: RequestHandler = async (req, res, next) => {
  try {
    let removeUserId: string;
    if (req.query && req.query.userId) {
      removeUserId = req.query.userId;
    } else {
      removeUserId = res.locals.user.userId;
    }
    await Skills.remove({ userId: removeUserId });

    await BluePromise.map(req.body.skills, (skill: any) => {
      skill.uniqueTitle = skill.skillTitle.trim().toLowerCase();
      skill.userId = removeUserId;
      skill.createdAt = new Date();
      skill.createdBy = res.locals.user.userId;
      const savableSkill = new Skills(skill);
      return savableSkill.save();
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
