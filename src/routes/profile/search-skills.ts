import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Skills } from '../../models/Skills';

import '../../models/SkillCategory';
import '../../models/SkillSubCategory';

export const searchSkills: RequestHandler = async (req, res, next) => {
  try {
    const skillText = req.query.text ? req.query.text : '';
    const regexp = new RegExp(`${skillText}`, 'i');
    const skillsSearched = await Skills.find({
      skillTitle: regexp,
    })
      .populate('category')
      .populate('subCategory')
      .select('skillTitle cluster category subCategory')
      .exec();
    return res.status(200).send({
      success: true,
      skills: skillsSearched,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
