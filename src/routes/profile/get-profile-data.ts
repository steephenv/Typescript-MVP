import { RequestHandler } from 'express';

import { PersonalDetails } from '../../models/PersonalDetails';
import { CustomerCredentials } from '../../models/CustomerCredentials';
import { Education } from '../../models/Education';
import { Experience } from '../../models/Experience';
import { EmployeeProjects } from '../../models/EmployeeProjects';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getLinkedData: RequestHandler = async (req, res, next) => {
  try {
    const personalDetailsData = await PersonalDetails.find({
      userId: res.locals.user.userId,
    });
    const educationData = await Education.find({
      userId: res.locals.user.userId,
    });
    const workExperianceData = await Experience.find({
      userId: res.locals.user.userId,
    });
    const projectsData = await EmployeeProjects.find({
      userId: res.locals.user.userId,
    });
    const customerCredentialsData = await CustomerCredentials.find({
      userId: res.locals.user.userId,
    });
    res.status(200).json({
      PersonalDetails: personalDetailsData,
      Education: educationData,
      WorkExperiance: workExperianceData,
      Projects: projectsData,
      CustomerCredentials: customerCredentialsData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
