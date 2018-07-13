import { RequestHandler } from 'express';

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
      : res.locals.userId;
    const personalDetailsData = await PersonalDetails.findOne({
      userId: comingUserId,
    }).exec();
    const educationData = await Education.find({
      userId: comingUserId,
    }).exec();
    const workExperienceData = await Experience.find({
      userId: comingUserId,
    }).exec();
    const projectsData = await EmployeeProjects.find({
      userId: comingUserId,
    }).exec();
    const customerCredentialsData = await CustomerCredentials.find({
      userId: comingUserId,
    }).exec();
    const goalData = await Goals.find({
      userId: comingUserId,
    }).exec();
    const skillData = await Skills.find({
      userId: comingUserId,
    }).exec();
    const wlbData = await Wlb.find({
      userId: comingUserId,
    }).exec();

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
