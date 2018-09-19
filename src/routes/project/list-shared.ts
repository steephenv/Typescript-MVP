import { RequestHandler } from 'express';

import { Project } from '../../models/Project';
import '../../models/ProjectSubCategory';
import '../../models/Industries';
import '../../models/Business-function';
import '../../models/ProjectCategory';
import '../../models/Business-sub-function';
import '../../models/User';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Share } from '../../models/share';

export const listShared: RequestHandler = async (req, res, next) => {
  try {
    const dataCount = await Share.count({
      userId: res.locals.user.userId,
    })
      .distinct('projectId')
      .exec();
    const sharedIds = await Share.find({
      userId: res.locals.user.userId,
    })
      .distinct('projectId')
      .exec();
    const projectDetails = await Project.find({
      _id: { $in: sharedIds },
    })
      .limit(req.query.limit)
      .skip(req.query.skip)
      .select('_id projectTitle picture currentSituation')
      .exec();
    return res.status(200).send({
      success: true,
      projects: projectDetails,
      count: dataCount,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
