import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Experience } from '../../models/Experience';
import { EmployeeProjects } from '../../models/EmployeeProjects';
import { addNewCity } from '../../utils/add-new-city';
import { addNewBusinessFunction } from '../../utils/add-new-bus-fun-industryline';
import { addNewIndustryLine } from '../../utils/add-new-bus-fun-industryline';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveExperience: RequestHandler = async (req, res, next) => {
  try {
    // first delete experience, then re-create it.
    let removeUserId: string;
    if (req.query && req.query.userId) {
      removeUserId = req.query.userId;
    } else {
      removeUserId = res.locals.user.userId;
    }
    await Experience.remove({ userId: removeUserId });
    await EmployeeProjects.remove({ userId: removeUserId });
    await BluePromise.map(req.body.experiences, async (exp: any) => {
      exp.userId = removeUserId;
      exp.createdAt = new Date();
      exp.createdBy = res.locals.user.userId;
      exp.submitted = true;
      const newData = new Experience(exp);
      const expSave = newData.save();
      const citySave = addNewCity(exp.locationState, exp.locationCity);
      await BluePromise.all([expSave, citySave]);
      await addNewIndustryLine(exp.companyIndustryLine);
      return;
    });
    await BluePromise.map(req.body.projects, async (project: any) => {
      project.userId = removeUserId;
      project.createdAt = new Date();
      project.createdBy = res.locals.user.userId;
      project.submitted = true;
      const newData = new EmployeeProjects(project);
      const projSave = newData.save();
      const citySave = addNewCity(project.locationState, project.locationCity);
      await BluePromise.all([projSave, citySave]);
      await addNewBusinessFunction(project.businessFunction);
      await addNewIndustryLine(project.companyIndustryLine);
      return;
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
