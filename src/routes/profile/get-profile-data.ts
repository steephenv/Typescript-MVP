import { RequestHandler } from 'express';

import { PersonalDetails } from '../../models/PersonalDetails';
import { customerCredentials } from '../../models/CustomerCredentials';
import { Education } from '../../models/Education';
import { experiance } from '../../models/Experiance';
import { projects } from '../../models/Projecs';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getLinkedData: RequestHandler = async (req, res, next) => {
  try {
    const personalDetailsData = await PersonalDetails.findOne({
      userId: res.locals.userId,
    });
    const educationData = await Education.findOne({
      userId: res.locals.userId,
    });
    const workExperianceData = await experiance.findOne({
      userId: res.locals.userId,
    });
    const projectsData = await projects.findOne({
      userId: res.locals.userId,
    });
    const customerCredentialsData = await customerCredentials.findOne({
      userId: res.locals.userId,
    });
    res.json({
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
