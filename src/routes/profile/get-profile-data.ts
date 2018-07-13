import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { PersonalDetails } from '../../models/PersonalDetails';
import { CustomerCredentials } from '../../models/CustomerCredentials';
import { Education } from '../../models/Education';
import { Experience } from '../../models/Experience';
import { EmployeeProjects } from '../../models/EmployeeProjects';
import { Goals } from '../../models/Goals';
import { Skills } from '../../models/Skills';
import { Wlb } from '../../models/WLB';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getLinkedData: RequestHandler = async (req, res, next) => {
  try {
    const comingUserId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    const personalDetailsDataPromise = PersonalDetails.findOne({
      userId: comingUserId,
    }).exec();
    const educationDataPromise = Education.find({
      userId: comingUserId,
    }).exec();
    const workExperienceDataPromise = Experience.find({
      userId: comingUserId,
    }).exec();
    const projectsDataPromise = EmployeeProjects.find({
      userId: comingUserId,
    }).exec();
    const customerCredentialsDataPromise = CustomerCredentials.find({
      userId: comingUserId,
    }).exec();
    const goalDataPromise = Goals.find({
      userId: comingUserId,
    }).exec();
    const skillDataPromise = Skills.find({
      userId: comingUserId,
    }).exec();
    const wlbDataPromise = Wlb.find({
      userId: comingUserId,
    }).exec();

    const [
      personalDetailsData,
      educationData,
      workExperienceData,
      projectsData,
      customerCredentialsData,
    ] = await BluePromise.all([
      personalDetailsDataPromise,
      educationDataPromise,
      workExperienceDataPromise,
      projectsDataPromise,
      customerCredentialsDataPromise,
    ]);

    const [goalData, skillData, wlbData] = await BluePromise.all([
      goalDataPromise,
      skillDataPromise,
      wlbDataPromise,
    ]);

    res.status(200).json({
      PersonalDetails: personalDetailsData,
      Education: educationData,
      WorkExperience: workExperienceData,
      Projects: projectsData,
      CustomerCredentials: customerCredentialsData,
      Goals: goalData,
      Skills: skillData,
      WLB: wlbData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
