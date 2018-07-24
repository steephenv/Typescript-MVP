import { RequestHandler } from 'express';

import { Project } from '../../models/Project';
import { addNewBusinessSubFunction } from '../../utils/add-bus-sub-fun';
import { addNewBusinessFunction } from '../../utils/add-new-bus-fun-industryline';
import { addNewIndustryLine } from '../../utils/add-new-bus-fun-industryline';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveProject: RequestHandler = async (req, res, next) => {
  try {
    const where: any = {};

    where.userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    req.body.updatedAt = new Date();
    req.body.userId = where.userId;
    if (req.query && req.query.userId) {
      await Project.update(where, { $set: req.body });
    } else {
      req.body.createdAt = new Date();
      const projectData = new Project(req.body);
      await projectData.save();
    }
    await addNewBusinessFunction(req.body.businessFunctions);
    await addNewBusinessSubFunction(
      req.body.categoryId,
      req.body.businessSubFunctions,
    );
    await addNewIndustryLine(req.body.companyIndustryLine);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
