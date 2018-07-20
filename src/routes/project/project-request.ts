import { ProjectRequest } from '../../models/ProjectRequest';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveProjectRequest: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    // req.body.submitted = true;
    // const criteria = {
    //   userId: req.body.userId,
    //   updatedAt: req.body.updatedAt,
    //   roleAndResponsibility: req.body.roleAndResponsibility,
    //   skillsAndExperience: req.body.skillsAndExperience,
    //   clientsMessage: req.body.clientsMessage,
    //   proposalSubmissionDate: new Date(),
    // };
    if (req.query && req.query.userId) {
      await ProjectRequest.update(where, { $set: req.body });
    } else {
      req.body.createdAt = new Date();
      req.body.createdBy = res.locals.user.userId;
      const projectData = new ProjectRequest(req.body);
      await projectData.save();
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
