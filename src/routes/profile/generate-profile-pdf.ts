import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import * as path from 'path';

import { PersonalDetails } from '../../models/PersonalDetails';
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

const ejsPath = path.join(__dirname, '../utils/assets/review-pdf.ejs');

function getHtmlString(newEjsPath: string, dataObj: any) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(newEjsPath, dataObj, (err, str) => {
      if (err) {
        return reject(err);
      }
      return resolve(str);
    });
  });
}

export const getProfileData = async (comingUserId: string) => {
  const personalDetailsDataPromise: any = PersonalDetails.findOne({
    userId: comingUserId,
  })
    .lean()
    .exec();
  const educationDataPromise = Education.find({
    userId: comingUserId,
  })
    .lean()
    .exec();
  const workExperienceDataPromise = Experience.find({
    userId: comingUserId,
  })
    .lean()
    .exec();
  const projectsDataPromise = EmployeeProjects.find({
    userId: comingUserId,
  })
    .lean()
    .exec();

  const goalDataPromise = Goals.findOne({
    userId: comingUserId,
  })
    .lean()
    .exec();
  const skillDataPromise = Skills.find({
    userId: comingUserId,
  })
    .lean()
    .exec();
  const wlbDataPromise = Wlb.findOne({
    userId: comingUserId,
  })
    .lean()
    .exec();
  return await BluePromise.all([
    personalDetailsDataPromise,
    educationDataPromise,
    workExperienceDataPromise,
    projectsDataPromise,
    goalDataPromise,
    skillDataPromise,
    wlbDataPromise,
  ]);
};

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    const [
      personalDetailsData,
      educationData,
      workExperienceData,
      projectsData,
      goalData,
      skillData,
      wlbData,
    ] = await getProfileData(userId);

    const htmlString: any = await getHtmlString(ejsPath, {
      personalDetailsData,
      educationData,
      workExperienceData,
      projectsData,
      goalData,
      skillData,
      wlbData,
    });

    const options: any = {
      format: 'A4',
      width: '1100px',
      height: '1400px',
      orientation: 'portrait',
      margin: '5cm',
      border: {
        top: '1in', // default is 0, units: mm, cm, in, px
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
    };

    pdf.create(htmlString, options).toStream((err: any, stream: any) => {
      if (err) {
        return next(
          new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err),
        );
      }

      return stream.pipe(res);
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
